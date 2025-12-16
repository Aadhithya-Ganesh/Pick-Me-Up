import React, { useState } from 'react';
import RideDetailsForm from '../components/RideDetailsForm';
import VehicleInfoForm from '../components/VehicleInfoForm';

function DriverPage() {
  // Track which step we're on
  const [currentStep, setCurrentStep] = useState(1);

  // Store all form data in one place
  const [rideData, setRideData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    departureTime: '',
    duration: '',
    availableSeats: '',
    pricePerSeat: 15
  });

  const [vehicleData, setVehicleData] = useState({
    carMake: '',
    carModel: '',
    licensePlate: ''
  });

  // Additional settings for step 3
  const [instantBooking, setInstantBooking] = useState(true);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Handle ride details form input changes
  const handleRideInputChange = (e) => {
    const { name, value } = e.target;
    setRideData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle vehicle form input changes
  const handleVehicleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Navigate to next step
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      console.log('Moving to step:', currentStep + 1);
    }
  };

  // Navigate to previous step
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      console.log('Moving back to step:', currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Offer a Ride
          </h1>
          <p className="text-xl text-gray-600">
            Share your journey and earn money
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="flex items-center justify-center mb-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-semibold mb-2 ${
              currentStep > 1 
                ? 'bg-blue-500 text-white' 
                : currentStep === 1 
                ? 'bg-blue-500 text-white' 
                : 'border-2 border-gray-300 text-gray-400'
            }`}>
              {currentStep > 1 ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                '1'
              )}
            </div>
            <span className={`text-sm font-medium ${currentStep >= 1 ? 'text-gray-900' : 'text-gray-500'}`}>
              Ride Details
            </span>
          </div>

          {/* Connector Line 1 */}
          <div className={`w-32 h-0.5 mx-4 mt-[-24px] ${currentStep > 1 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-semibold mb-2 ${
              currentStep > 2 
                ? 'bg-blue-500 text-white' 
                : currentStep === 2 
                ? 'bg-blue-500 text-white' 
                : 'border-2 border-gray-300 text-gray-400'
            }`}>
              {currentStep > 2 ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                '2'
              )}
            </div>
            <span className={`text-sm font-medium ${currentStep >= 2 ? 'text-gray-900' : 'text-gray-500'}`}>
              Vehicle Info
            </span>
          </div>

          {/* Connector Line 2 */}
          <div className={`w-32 h-0.5 mx-4 mt-[-24px] ${currentStep > 2 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-semibold mb-2 ${
              currentStep === 3 
                ? 'bg-blue-500 text-white' 
                : 'border-2 border-gray-300 text-gray-400'
            }`}>
              3
            </div>
            <span className={`text-sm font-medium ${currentStep === 3 ? 'text-gray-900' : 'text-gray-500'}`}>
              Review & Publish
            </span>
          </div>
        </div>

        {/* Render the appropriate form based on current step */}
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
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Review & Publish
              </h2>
              <p className="text-gray-600">
                Review your ride details before publishing
              </p>
            </div>
            
            {/* Ride Information Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ride Information</h3>
              <div className="space-y-2 text-base">
                <p><span className="font-bold">From:</span> {rideData.origin || 'Not specified'}</p>
                <p><span className="font-bold">To:</span> {rideData.destination || 'Not specified'}</p>
                <p><span className="font-bold">Date:</span> {rideData.departureDate || 'Not specified'}</p>
                <p><span className="font-bold">Time:</span> {rideData.departureTime || 'Not specified'}</p>
                <p><span className="font-bold">Duration:</span> {rideData.duration || 'Not specified'}</p>
                <p><span className="font-bold">Seats:</span> {rideData.availableSeats || 'Not specified'}</p>
                <p><span className="font-bold">Price:</span> €{rideData.pricePerSeat}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300 my-8"></div>
            
            {/* Vehicle Information Section */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Vehicle Information</h3>
              <div className="space-y-2 text-base">
                <p><span className="font-bold">Make:</span> {vehicleData.carMake || 'Not specified'}</p>
                <p><span className="font-bold">Model:</span> {vehicleData.carModel || 'Not specified'}</p>
                <p><span className="font-bold">License:</span> {vehicleData.licensePlate || 'Not specified'}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-300 my-8"></div>

            {/* Instant Booking Toggle */}
            <div className="mb-6">
              <div className="flex items-center justify-between p-6 border border-gray-300 rounded-xl">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900">Instant Booking</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-600">Allow instant booking without approval</p>
                </div>
                <button
                  onClick={() => setInstantBooking(!instantBooking)}
                  className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    instantBooking ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      instantBooking ? 'translate-x-9' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="mb-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="w-6 h-6 text-blue-500 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                />
                <span className="text-base text-gray-900">
                  I agree to the terms and conditions and privacy policy
                </span>
              </label>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center pt-6">
              <button
                type="button"
                onClick={handleBack}
                className="px-8 py-3 bg-gray-200 text-gray-700 text-base font-semibold rounded-xl hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!agreeToTerms) {
                    alert('Please agree to the terms and conditions');
                    return;
                  }
                  console.log('Publishing ride...', { rideData, vehicleData, instantBooking });
                }}
                className="px-8 py-3 bg-green-500 text-white text-base font-semibold rounded-xl hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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