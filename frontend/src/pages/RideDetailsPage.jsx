import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import RideDetailsCard from "../components/RideDetailsCard";

function RideDetailsPage() {
  const ride = {
    id: 1,
    driver: {
      name: "Michael Brown",
      rating: 4.7,
      member_since: "2024",
    },
    car: "Chevrolet Malibu",
    from: "Austin, TX",
    to: "Houston, TX",
    date: "2024-12-24",
    time: "11:30 AM",
    seats: 3,
    duration: "2h 40m",
    price: 15,
    distance: 165,
  };

  return (
    <>
      <div>
        <Link
          to="/rides"
          className="text-text hover:text-primary hover:bg-background mx-9 my-5 flex w-fit cursor-pointer items-center gap-5 rounded-2xl p-4 font-bold transition-colors ease-in"
        >
          <ArrowLeft className="h-4 w-4" />
          <p>Back</p>
        </Link>
      </div>
      <div className="m-10 grid grid-cols-8 gap-5">
        <div className="col-span-6">
          <RideDetailsCard ride={ride} />
        </div>
        <div className="sticky top-40 col-span-2 h-fit rounded-2xl border border-gray-300/70 p-5">
          <div className="border-b border-gray-300/70 pb-5">
            <p className="mb-7 text-2xl font-semibold">Book This Ride</p>
            <p>
              <span className="mr-2 text-4xl font-bold">${ride.price}</span>
              <span className="text-gray-400">per seat</span>
            </p>
            <Link
              to={`/book/${ride.id}`}
              className="bg-primary mt-5 block w-full cursor-pointer rounded-2xl px-7 py-3 text-center font-semibold text-white transition-colors ease-in hover:bg-yellow-200"
            >
              Continue to Booking
            </Link>
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="text-gray-400">Available seats</p>
              <p>{ride.seats}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">Trip distance</p>
              <p>{ride.distance} miles</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">Duration</p>
              <p>{ride.duration}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RideDetailsPage;
