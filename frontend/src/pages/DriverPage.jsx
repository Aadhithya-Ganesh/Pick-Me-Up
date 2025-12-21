import React, { useState } from "react";
import RideDetailsForm from "../components/RideDetailsForm";
import VehicleInfoForm from "../components/VehicleInfoForm";
import { useNavigate } from "react-router-dom";

function DriverPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const [rideData, setRideData] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    departureTime: "",
    duration: "",
    availableSeats: "",
    pricePerSeat: 15,
  });

  const [vehicleData, setVehicleData] = useState({
    carMake: "",
    carModel: "",
    licensePlate: "",
  });

  const [instantBooking, setInstantBooking] = useState(true);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const navigate = useNavigate();
  // Handle ride details form input changes
  const handleRideInputChange = (e) => {
    const { name, value } = e.target;
    setRideData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle vehicle form input changes
  const handleVehicleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Navigate to next step
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      console.log("Moving to step:", currentStep + 1);
    }
  };

  // Navigate to previous step
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      console.log("Moving back to step:", currentStep - 1);
    }
  };

  // Handle publish ride - create payload and send to API
  const handlePublishRide = async () => {
    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    const payload = {
      user_id: localStorage.getItem("userId"), // get from auth context/localStorage
      origin: rideData.origin,
      driver_name: localStorage.getItem("username"), // get from auth context/localStorage
      destination: rideData.destination,
      date: rideData.departureDate,
      time: rideData.departureTime,
      duration: rideData.duration,
      seats: parseInt(rideData.availableSeats),
      price: parseFloat(rideData.pricePerSeat),
      car_make: vehicleData.carMake,
      car_color: vehicleData.carModel,
      license_plate: vehicleData.licensePlate,
      notes: null,
      instant_booking: instantBooking,
    };

    console.log(JSON.stringify(payload, null, 2));

    // // Send to API
    try {
      console.log("Sending request to API...");
      const response = await fetch("http://localhost/api/rides/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("API Response:", data);
      // notify navbar immediately
      window.dispatchEvent(new Event("notifications:refresh"));
      navigate(`/rides/${data.id}`);
    } catch (error) {
      console.error("API ERROR:");
      console.error(error);

      if (error.response) {
        alert(
          `Failed to publish ride: ${error.response.data.detail || "Server error"}`,
        );
      } else if (error.request) {
        alert(
          "Failed to publish ride: No response from server. Please check your connection.",
        );
      } else {
        alert("Failed to publish ride: " + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-5xl font-bold text-gray-900">
            Offer a Ride
          </h1>
          <p className="text-xl text-gray-600">
            Share your journey and earn money
          </p>
        </div>

        <div className="mb-12 flex items-center justify-center">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div
              className={`mb-2 flex h-14 w-14 items-center justify-center rounded-full text-xl font-semibold ${
                currentStep > 1
                  ? "bg-blue-500 text-white"
                  : currentStep === 1
                    ? "bg-blue-500 text-white"
                    : "border-2 border-gray-300 text-gray-400"
              }`}
            >
              {currentStep > 1 ? (
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                "1"
              )}
            </div>
            <span
              className={`text-sm font-medium ${currentStep >= 1 ? "text-gray-900" : "text-gray-500"}`}
            >
              Ride Details
            </span>
          </div>

          {/* Connector Line 1 */}
          <div
            className={`mx-4 -mt-6 h-0.5 w-32 ${currentStep > 1 ? "bg-blue-500" : "bg-gray-300"}`}
          ></div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div
              className={`mb-2 flex h-14 w-14 items-center justify-center rounded-full text-xl font-semibold ${
                currentStep > 2
                  ? "bg-blue-500 text-white"
                  : currentStep === 2
                    ? "bg-blue-500 text-white"
                    : "border-2 border-gray-300 text-gray-400"
              }`}
            >
              {currentStep > 2 ? (
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                "2"
              )}
            </div>
            <span
              className={`text-sm font-medium ${currentStep >= 2 ? "text-gray-900" : "text-gray-500"}`}
            >
              Vehicle Info
            </span>
          </div>

          {/* Connector Line 2 */}
          <div
            className={`mx-4 -mt-6 h-0.5 w-32 ${currentStep > 2 ? "bg-blue-500" : "bg-gray-300"}`}
          ></div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div
              className={`mb-2 flex h-14 w-14 items-center justify-center rounded-full text-xl font-semibold ${
                currentStep === 3
                  ? "bg-blue-500 text-white"
                  : "border-2 border-gray-300 text-gray-400"
              }`}
            >
              3
            </div>
            <span
              className={`text-sm font-medium ${currentStep === 3 ? "text-gray-900" : "text-gray-500"}`}
            >
              Review & Publish
            </span>
          </div>
        </div>

        {currentStep === 1 && (
          <RideDetailsForm
            formData={rideData}
            onInputChange={handleRideInputChange}
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && (
          <VehicleInfoForm
            vehicleData={vehicleData}
            onInputChange={handleVehicleInputChange}
            onBack={handleBack}
            onNext={handleNext}
          />
        )}

        {currentStep === 3 && (
          <div className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
            <div className="mb-8">
              <h2 className="mb-2 text-3xl font-bold text-gray-900">
                Review & Publish
              </h2>
              <p className="text-gray-600">
                Review your ride details before publishing
              </p>
            </div>

            {/* Ride Information Section */}
            <div className="mb-8">
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                Ride Information
              </h3>
              <div className="space-y-2 text-base">
                <p>
                  <span className="font-bold">From:</span>{" "}
                  {rideData.origin || "Not specified"}
                </p>
                <p>
                  <span className="font-bold">To:</span>{" "}
                  {rideData.destination || "Not specified"}
                </p>
                <p>
                  <span className="font-bold">Date:</span>{" "}
                  {rideData.departureDate || "Not specified"}
                </p>
                <p>
                  <span className="font-bold">Time:</span>{" "}
                  {rideData.departureTime || "Not specified"}
                </p>
                <p>
                  <span className="font-bold">Duration:</span>{" "}
                  {rideData.duration || "Not specified"}
                </p>
                <p>
                  <span className="font-bold">Seats:</span>{" "}
                  {rideData.availableSeats || "Not specified"}
                </p>
                <p>
                  <span className="font-bold">Price:</span> €
                  {rideData.pricePerSeat}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-gray-300"></div>

            {/* Vehicle Information Section */}
            <div className="mb-8">
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                Vehicle Information
              </h3>
              <div className="space-y-2 text-base">
                <p>
                  <span className="font-bold">Make:</span>{" "}
                  {vehicleData.carMake || "Not specified"}
                </p>
                <p>
                  <span className="font-bold">Color:</span>{" "}
                  {vehicleData.carModel || "Not specified"}
                </p>
                <p>
                  <span className="font-bold">License:</span>{" "}
                  {vehicleData.licensePlate || "Not specified"}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-gray-300"></div>

            {/* Instant Booking Toggle */}
            <div className="mb-6">
              <div className="flex items-center justify-between rounded-xl border border-gray-300 p-6">
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      Instant Booking
                    </h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-600">
                    Allow instant booking without approval
                  </p>
                </div>
                <button
                  onClick={() => setInstantBooking(!instantBooking)}
                  className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
                    instantBooking ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      instantBooking ? "translate-x-9" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="mb-8">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="h-6 w-6 cursor-pointer rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-base text-gray-900">
                  I agree to the terms and conditions and privacy policy
                </span>
              </label>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-6">
              <button
                type="button"
                onClick={handleBack}
                className="rounded-xl bg-gray-200 px-8 py-3 text-base font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handlePublishRide}
                className="rounded-xl bg-green-500 px-8 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
              >
                Publish Ride
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DriverPage;
