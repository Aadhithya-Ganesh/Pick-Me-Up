import React, { useState } from 'react';

function RideDetailsForm({ formData, onInputChange, onNext }) {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const requiredFields = [
      { name: 'origin', label: 'Origin Location' },
      { name: 'destination', label: 'Destination Location' },
      { name: 'departureDate', label: 'Departure Date' },
      { name: 'departureTime', label: 'Departure Time' },
      { name: 'duration', label: 'Estimated Duration' },
      { name: 'availableSeats', label: 'Available Seats' },
      { name: 'pricePerSeat', label: 'Price per Seat' }
    ];

    const newErrors = {};
    let isValid = true;

    for (const field of requiredFields) {
      if (!formData[field.name] || formData[field.name] === '') {
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
          Ride Details
        </h2>
        <p className="text-gray-600">
          Enter the basic details of your ride
        </p>
      </div>

      <form className="space-y-6">
        {/* Origin Location */}
        <div>
          <label className="block text-base font-semibold text-gray-900 mb-2">
            Origin Location
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input
              type="text"
              name="origin"
              required
              value={formData.origin}
              onChange={onInputChange}
              placeholder="Where are you starting from?"
              className={getInputClasses('origin', "w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent")}
            />
            {errors.origin && <p className="mt-1 text-sm text-red-500">{errors.origin}</p>}
          </div>
        </div>

        {/* Destination Location */}
        <div>
          <label className="block text-base font-semibold text-gray-900 mb-2">
            Destination Location
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input
              type="text"
              name="destination"
              required
              value={formData.destination}
              onChange={onInputChange}
              placeholder="Where are you going?"
              className={getInputClasses('destination', "w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent")}
            />
            {errors.destination && <p className="mt-1 text-sm text-red-500">{errors.destination}</p>}
          </div>
        </div>

        {/* Departure Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Departure Date */}
          <div>
            <label className="block text-base font-semibold text-gray-900 mb-2">
              Departure Date
            </label>
            <input
              type="text"
              name="departureDate"
              required
              value={formData.departureDate}
              onChange={onInputChange}
              placeholder="dd/mm/yyyy"
              onFocus={(e) => e.target.type = 'date'}
              onBlur={(e) => { if (!e.target.value) e.target.type = 'text' }}
              className={getInputClasses('departureDate', "w-full px-4 py-4 border border-gray-300 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent")}
            />
            {errors.departureDate && <p className="mt-1 text-sm text-red-500">{errors.departureDate}</p>}
          </div>

          {/* Departure Time */}
          <div>
            <label className="block text-base font-semibold text-gray-900 mb-2">
              Departure Time
            </label>
            <input
              type="time"
              name="departureTime"
              required
              value={formData.departureTime}
              onChange={onInputChange}
              className={getInputClasses('departureTime', "w-full px-4 py-4 border border-gray-300 rounded-xl text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent")}
            />
            {errors.departureTime && <p className="mt-1 text-sm text-red-500">{errors.departureTime}</p>}
          </div>
        </div>

        {/* Estimated Duration */}
        <div>
          <label className="block text-base font-semibold text-gray-900 mb-2">
            Estimated Duration
          </label>
          <div className="relative">
            <select
              name="duration"
              required
              value={formData.duration}
              onChange={onInputChange}
              className={getInputClasses('duration', "w-full px-4 py-4 pr-12 border border-gray-300 rounded-xl text-base text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent")}
            >
              <option value="">1 hour</option>
              <option value="30 minutes">30 minutes</option>
              <option value="1 hour">1 hour</option>
              <option value="1 hour 30 minutes">1 hour 30 minutes</option>
              <option value="2 hours">2 hours</option>
              <option value="2 hours 30 minutes">2 hours 30 minutes</option>
              <option value="3 hours">3 hours</option>
              <option value="3 hours 30 minutes">3 hours 30 minutes</option>
              <option value="4 hours">4 hours</option>
              <option value="4 hours 30 minutes">4 hours 30 minutes</option>
              <option value="5 hours">5 hours</option>
              <option value="5 hours 30 minutes">5 hours 30 minutes</option>
              <option value="6 hours">6 hours</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration}</p>}
          <p className="mt-2 text-sm text-gray-500">
            How long will the journey take?
          </p>
        </div>

        {/* Available Seats and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Available Seats */}
          <div>
            <label className="block text-base font-semibold text-gray-900 mb-2">
              Available Seats
            </label>
            <div className="relative">
              <select
                name="availableSeats"
                required
                value={formData.availableSeats}
                onChange={onInputChange}
                className={getInputClasses('availableSeats', "w-full px-4 py-4 border border-gray-300 rounded-xl text-base text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent")}
              >
                <option value="">Select seats</option>
                <option value="1">1 seat</option>
                <option value="2">2 seats</option>
                <option value="3">3 seats</option>
                <option value="4">4 seats</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.availableSeats && <p className="mt-1 text-sm text-red-500">{errors.availableSeats}</p>}
          </div>

          {/* Price per Seat */}
          <div>
            <label className="block text-base font-semibold text-gray-900 mb-2">
              Price per Seat
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-500 text-base">€</span>
              </div>
              <input
                type="number"
                name="pricePerSeat"
                required
                value={formData.pricePerSeat}
                onChange={onInputChange}
                min="5"
                max="100"
                className={getInputClasses('pricePerSeat', "w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent")}
              />
            </div>
            {errors.pricePerSeat && <p className="mt-1 text-sm text-red-500">{errors.pricePerSeat}</p>}
            <p className="mt-2 text-sm text-gray-500">
              €5 - €100
            </p>
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-end pt-6">
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
  );
}

export default RideDetailsForm;