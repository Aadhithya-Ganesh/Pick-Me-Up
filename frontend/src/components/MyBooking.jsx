import { Await, useLoaderData } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { MapPin, Calendar, Users, Car } from "lucide-react";
import BackdropLoader from "../utils/BackdropLoader";
import { Link } from "react-router-dom";
import { useRevalidator } from "react-router-dom";

function BookingCard({ booking }) {
  const statusColor =
    booking.status === "CONFIRMED"
      ? "bg-green-100 text-green-700"
      : booking.status === "PENDING"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-100 text-gray-600";

  return (
    <div className="flex justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* LEFT */}
      <div className="flex gap-6">
        <div className="flex flex-col items-center">
          <MapPin className="text-yellow-500" />
          <div className="h-10 w-px bg-gray-300"></div>
          <MapPin className="text-yellow-500" />
        </div>

        <div>
          <div className="mb-2 flex items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor}`}
            >
              {booking.status}
            </span>
            <span className="text-sm text-gray-500">
              Booked on{" "}
              {new Date(booking.created_at).toLocaleDateString()}
            </span>
          </div>

          <p className="text-lg font-semibold">
            {booking.origin}
          </p>
          <p className="mb-3 text-lg font-semibold">
            {booking.destination}
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {booking.date} · {booking.time}
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} />
              {booking.seats} seat(s)
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-600">
            <span className="font-semibold">Driver:</span>{" "}
            {booking.driver_name} · {booking.car}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end justify-between">
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">
            ${booking.price}
          </p>
          <p className="text-sm text-gray-500">Total price</p>
        </div>

        <Link
          to={`/booking/${booking.booking_id}`}
          className="bg-primary px-4 py-2 border rounded-xl text-sm font-semibold hover:bg-gray-50"
          >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default function MyBooking() {
  const { data } = useLoaderData();
   const revalidator = useRevalidator();

  useEffect(() => {
    revalidator.revalidate();
  }, []);
  return (
    <div className="m-8">      
      <Suspense fallback={<BackdropLoader />}>
        <Await resolve={data}>
          {(bookings) =>
            !bookings || bookings.length === 0 ? (
              <div className="w-full rounded-2xl border border-gray-200 p-20">
                <div className="m-auto flex w-fit items-center gap-5">
                  <Car size={48} color="#b8b7b7" />
                  <span className="inline text-center text-2xl font-semibold text-gray-500">
                    No Bookings Yet.
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((b) => (
                  <BookingCard key={b.booking_id} booking={b} />
                ))}
              </div>
            )
          }
        </Await>
      </Suspense>
    </div>
  );
}

export async function loader() {
  const userId = localStorage.getItem("userId");

  const res = await fetch("http://localhost/api/bookings", {
    headers: {
      "X-User-ID": userId,
      "X-User-Role": "USER",
    },
  });

  const bookingData = await res.json();
  const enrichedBookings = await Promise.all(
    bookingData.bookings.map(async (b) => {
      const rideRes = await fetch(
        `http://localhost/api/rides/${b.ride_id}`
      );
      const ride = await rideRes.json();

      return {
        booking_id: b.booking_id,
        status: b.status,
        seats: b.seats_booked,
        created_at: b.created_at,

        price: ride.price * b.seats_booked,
        origin: ride.origin,
        destination: ride.destination,
        date: ride.date,
        time: ride.time,
        driver_name: ride.driver_name,
        car: `${ride.car_make} ${ride.car_color}`,
      };
    })
  );

  return { data: enrichedBookings };
}
