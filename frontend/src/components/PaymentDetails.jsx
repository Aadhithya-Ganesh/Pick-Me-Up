import { Link } from "react-router-dom";

function PaymentDetails({ ride }) {
  return (
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
  );
}

export default PaymentDetails;
