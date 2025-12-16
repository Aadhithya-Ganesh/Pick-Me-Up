import React from 'react';

function VehicleInfoForm({ vehicleData, onInputChange, onBack, onNext }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Vehicle & Preferences
        </h2>
        <p className="text-gray-600">
          Tell us about your vehicle and preferences
        </p>
      </div>

      {/* Car Details Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0h-.5" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900">Car Details</h3>
        </div>

        <form className="space-y-6">
          {/* Car Make and Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Car Make */}
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">
                Car Make
              </label>
              <div className="relative">
                <select
                  name="carMake"
                  value={vehicleData.carMake}
                  onChange={onInputChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl text-base text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select car make</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Honda">Honda</option>
                  <option value="Ford">Ford</option>
                  <option value="BMW">BMW</option>
                  <option value="Mercedes-Benz">Mercedes-Benz</option>
                  <option value="Volkswagen">Volkswagen</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Car Model */}
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">
                Car Model
              </label>
              <div className="relative">
                <select
                  name="carModel"
                  value={vehicleData.carModel}
                  onChange={onInputChange}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl text-base text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select car model</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Minivan">Minivan</option>
                  <option value="Truck">Truck</option>
                  <option value="Convertible">Convertible</option>
                  <option value="Wagon">Wagon</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* License Plate */}
          <div>
            <label className="block text-base font-semibold text-gray-900 mb-2">
              License Plate
            </label>
            <input
              type="text"
              name="licensePlate"
              value={vehicleData.licensePlate}
              onChange={onInputChange}
              placeholder="e.g., ABC-1234"
              className="w-full px-4 py-4 border border-gray-300 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-6">
            {/* Back Button */}
            <button
              type="button"
              onClick={onBack}
              className="px-8 py-3 bg-gray-200 text-gray-700 text-base font-semibold rounded-xl hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Back
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-blue-500 text-white text-base font-semibold rounded-xl hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VehicleInfoForm;