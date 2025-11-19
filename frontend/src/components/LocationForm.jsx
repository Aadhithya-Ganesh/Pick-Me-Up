function LocationForm({ handleStepChange, handleLocationChange, location }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = e.target;
    handleLocationChange({
      pickup: data[0].value,
      drop: data[1].value,
    });
    handleStepChange((prev) => prev + 1);
  };

  const handleBack = () => {
    handleStepChange((prev) => prev - 1);
  };

  return (
    <div className="sticky top-40 col-span-2 h-fit space-y-6 rounded-2xl border border-gray-300/70 p-10">
      <p className="text-2xl font-semibold">Enter Location Details</p>

      <form onSubmit={handleSubmit}>
        {/* Pick-up */}
        <div className="space-y-2">
          <label className="block font-medium">Pick-up Location</label>
          <input
            type="text"
            required
            value={location.pickup}
            placeholder="Enter specific pick-up address"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Drop-off */}
        <div className="mt-5 space-y-2">
          <label className="block font-medium">Drop-off Location</label>
          <input
            type="text"
            required
            value={location.drop}
            placeholder="Enter specific drop-off address"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-10">
          <button
            type="button"
            onClick={handleBack}
            className="text-text mt-5 block w-full cursor-pointer rounded-2xl bg-transparent px-7 py-3 text-center font-semibold shadow-lg hover:bg-gray-100"
          >
            Back
          </button>

          <button
            type="submit"
            className="bg-primary mt-5 block w-full cursor-pointer rounded-2xl px-7 py-3 text-center font-semibold text-white shadow-lg hover:bg-yellow-200"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default LocationForm;
