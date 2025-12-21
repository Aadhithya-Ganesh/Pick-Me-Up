import { ArrowLeft, CheckCircle, Clock, Check, XCircle } from "lucide-react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useState } from "react";
import TripInformationCard from "../components/TripInformationCard";
import CancelBookingModal from "../components/CancelBookingModal";

function BookingDetails() {
  const navigate = useNavigate();
  const booking = useLoaderData();  // ← Get data from loader
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Map booking data to trip object
  const trip = {
    status: booking.status.toLowerCase(), // "PENDING" → "pending"
    origin: {
      city: booking.origin || "N/A",
      address: booking.pickup_location || "N/A",
    },
    destination: {
      city: booking.destination || "N/A",
      address: booking.dropoff_location || "N/A",
    },
    date: booking.ride_date || "N/A",
    time: booking.departure_time || "N/A",
    seats: booking.seats_booked,
    price: booking.total_price || booking.price_per_seat,
    vehicle: `${booking.car_make || "N/A"} ${booking.car_color ? `(${booking.car_color})` : ""}`.trim(),
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        icon: Clock,
        text: "Pending",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-700",
        iconColor: "text-yellow-700",
      },
      confirmed: {
        icon: CheckCircle,
        text: "Confirmed",
        bgColor: "bg-green-100",
        textColor: "text-green-600",
        iconColor: "text-green-600",
      },
      completed: {
        icon: Check,
        text: "Completed",
        bgColor: "bg-blue-100",
        textColor: "text-blue-600",
        iconColor: "text-blue-600",
      },
      cancelled: {
        icon: XCircle,
        text: "Cancelled",
        bgColor: "bg-red-100",
        textColor: "text-red-600",
        iconColor: "text-red-600",
      },
    };
    return configs[status] || configs.pending;
  };

  const statusConfig = getStatusConfig(trip.status);
  const StatusIcon = statusConfig.icon;

  const handleCancelClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    const userId = localStorage.getItem("userId");
    const role = "driver";

    try {
      const res = await fetch(`http://localhost/api/bookings/${booking.booking_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-User-ID": userId,
          "X-User-Role": role,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Failed to cancel booking:", error);
        alert("Failed to cancel booking. Please try again.");
        return;
      }

      const result = await res.json();
      console.log("Booking cancelled successfully:", result);
      
      setIsModalOpen(false);
      
      alert("Booking cancelled successfully!");
      navigate(-1); 
      
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 font-medium text-gray-700 transition-colors hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-900">Booking Details</h1>

          <div
            className={`flex items-center gap-2 rounded-full px-4 py-2 ${statusConfig.bgColor}`}
          >
            <StatusIcon className={`h-5 w-5 ${statusConfig.iconColor}`} />
            <span className={`font-semibold ${statusConfig.textColor}`}>
              {statusConfig.text}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <TripInformationCard trip={trip} />
        </div>

        {/* <div className="mb-6">
          <DriverInformationCard driver={driver} />
        </div> */}

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <button
            className="w-full rounded-lg bg-red-500 px-6 py-4 font-semibold text-white transition-colors duration-200 hover:bg-red-600"
            onClick={handleCancelClick}
          >
            Cancel Booking
          </button>
        </div>
      </div>

      <CancelBookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
}

export default BookingDetails;

// Loader function to fetch booking data
export async function loader({ params }) {
  const { bookingId } = params;
  const userId = localStorage.getItem("userId"); // Get userId from localStorage
  const role = "driver"; 

  try {
    const res = await fetch(`http://localhost/api/bookings/${bookingId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-User-ID": userId,
        "X-User-Role": role,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch booking details");
    }

    const booking = await res.json();
    return booking;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error; // React Router will handle the error
  }
}