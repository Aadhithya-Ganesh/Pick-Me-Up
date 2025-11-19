import { useState } from "react";
import Steps from "../components/Steps";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import RideDetailsCard from "../components/RideDetailsCard";
import PaymentInfo from "../components/PaymentInfo";
import SeatSelector from "../components/SeatSelector";
import LocationForm from "../components/LocationForm";
import BookingSummary from "../components/BookingSummary";

function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [location, setLocation] = useState({});
  const [seats, setSeats] = useState(1);
  const navigate = useNavigate();

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
            />
          )}
        </div>
        <PaymentInfo ride={ride} seats={seats} />
      </div>
    </div>
  );
}

export default BookingPage;
