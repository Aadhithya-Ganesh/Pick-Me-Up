import RiderPageCard from "./RiderPageCard";

function RidePageContent({ rides }) {
  return (
    <div className="w-full">
      <p className="text-2xl font-bold">
        {rides.length} {rides.length == 1 ? "Ride" : "Rides"} available
      </p>

      <div className="mt-5 grid grid-cols-1 gap-5">
        {rides.map((ride) => (
          <RiderPageCard key={ride.id} ride={ride} />
        ))}
      </div>
    </div>
  );
}

export default RidePageContent;
