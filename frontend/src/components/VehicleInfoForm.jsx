import React, { useState } from 'react';

function VehicleInfoForm({ vehicleData, onInputChange, onBack, onNext }) {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const requiredFields = [
      { name: 'carMake', label: 'Car Make' },
      { name: 'carModel', label: 'Car Color' },
      { name: 'licensePlate', label: 'License Plate' }
    ];

    const newErrors = {};
    let isValid = true;

    for (const field of requiredFields) {
      if (!vehicleData[field.name] || vehicleData[field.name] === '') {
        newErrors[field.name] = `${field.label} is required`;
        isValid = false;
      }
    }

    setErrors(newErrors);

    if (!isValid) {
      alert('Please fill in all required fields');
    }

    return isValid;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const getInputClasses = (fieldName, baseClasses) => {
    if (errors[fieldName]) {
      return baseClasses.replace('border-gray-300', 'border-red-500');
    }
    return baseClasses;
  };

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
                  required
                  value={vehicleData.carMake}
                  onChange={onInputChange}
                  className={getInputClasses('carMake', "w-full px-4 py-4 border border-gray-300 rounded-xl text-base text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent")}
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
              {errors.carMake && <p className="mt-1 text-sm text-red-500">{errors.carMake}</p>}
            </div>

            {/* Car Model */}
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">
                Car Color
              </label>
              <div className="relative">
                <select
                  name="carModel"
                  required
                  value={vehicleData.carModel}
                  onChange={onInputChange}
                  className={getInputClasses('carModel', "w-full px-4 py-4 border border-gray-300 rounded-xl text-base text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent")}
                >
                  <option value="">Select car color</option>
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                  <option value="Silver">Silver</option>
                  <option value="Gray">Gray</option>
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Green">Green</option>
                  <option value="Yellow">Yellow</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.carModel && <p className="mt-1 text-sm text-red-500">{errors.carModel}</p>}
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
              required
              value={vehicleData.licensePlate}
              onChange={onInputChange}
              placeholder="e.g., 2m1023n"
              className={getInputClasses('licensePlate', "w-full px-4 py-4 border border-gray-300 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent")}
            />
            {errors.licensePlate && <p className="mt-1 text-sm text-red-500">{errors.licensePlate}</p>}
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
              onClick={handleNext}
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