import RideSearchForm from "./RideSearchForm";

function RidePageHeader() {
  return (
    <div className="bg-primary p-20">
      <p className="text-text text-center text-4xl font-bold">
        Find Your Perfect Ride
      </p>
      <RideSearchForm />
    </div>
  );
}

export default RidePageHeader;
