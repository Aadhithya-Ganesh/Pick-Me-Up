import Steps from "../components/Steps";
import { ArrowLeft } from "lucide-react";
import RideDetailsCard from "../components/RideDetailsCard";
import PaymentInfo from "../components/PaymentInfo";
import SeatSelector from "../components/SeatSelector";
import LocationForm from "../components/LocationForm";
import BookingSummary from "../components/BookingSummary";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BookingPageContent({ ride }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [location, setLocation] = useState({});
  const [seats, setSeats] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
    const role = "driver";
    if (!userId || !role) {
      return;
    }

    try {
      // console.log(ride);
      const res = await fetch("http://localhost/api/bookings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-ID": userId,
          "X-User-Role": role,
        },
        body: JSON.stringify({
          ride_id: ride.id,
          seats_requested: seats,
          pickup_location: location.pickup,
          dropoff_location: location.drop,
          price: ride.price,
          duration: ride.duration,
          time: ride.time,
          date: ride.date,
          car_make: ride.car_make,
          car_color: ride.car_color,
          license_plate: ride.license_plate,
          driver_name: ride.driver_name,
          origin: ride.origin,
          destination: ride.destination,
        }),
      });



      if (!res.ok) {
        const err = await res.json();
        console.error(err);
        return;
      }

      const result = await res.json();
      console.log(result);
      // 🔔 notify navbar immediately
      window.dispatchEvent(new Event("notifications:refresh"));
      navigate(`/booking/${result.booking_id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="m-10">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="text-text hover:text-primary hover:bg-background my-5 flex w-fit cursor-pointer items-center gap-5 rounded-2xl p-4 font-bold transition-colors ease-in"
        >
          <ArrowLeft className="h-4 w-4" />
          <p>Back</p>
        </button>
      </div>

      <p className="mb-10 ml-5 text-3xl font-bold">Complete Your Booking</p>

      <Steps
        currentStep={currentStep}
        steps={["Select Seats", "Enter Details", "Confirm"]}
      />

      <div className="mt-20 grid grid-cols-8 gap-5">
        <div className="col-span-6 flex flex-col gap-5">
          <RideDetailsCard ride={ride} />

          {currentStep == 1 && (
            <SeatSelector
              seats={ride.seats}
              handleStepChange={setCurrentStep}
              handleSeatChange={setSeats}
              chosenSeat={seats}
            />
          )}

          {currentStep == 2 && (
            <LocationForm
              handleStepChange={setCurrentStep}
              handleLocationChange={setLocation}
              location={location}
            />
          )}

          {currentStep == 3 && (
            <BookingSummary
              handleStepChange={setCurrentStep}
              location={location}
              onSubmit={handleSubmit}
            />
          )}
        </div>

        <PaymentInfo ride={ride} seats={seats} />
      </div>
    </div>
  );
}

export default BookingPageContent;
