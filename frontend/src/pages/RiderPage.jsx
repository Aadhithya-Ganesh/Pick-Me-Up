import { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import RidePageHeader from "../components/RidePageHeader";
import RideFilter from "../components/RideFilter";
import RidePageContent from "../components/RidePageContent";
import BackdropLoader from "../utils/BackdropLoader";

function RiderPage() {
  const { rides } = useLoaderData();

  const [filterType, setFilterType] = useState("price");
  const [maxPrice, setMaxPrice] = useState(50);
  const [departureTime, setDepartureTime] = useState(new Date());

  return (
    <>
      <RidePageHeader />

      <Suspense fallback={<BackdropLoader />}>
        <Await resolve={rides}>
          {(rides) => {
            const filteredRides = rides.filter((ride) => {
              if (filterType === "price") {
                return ride.price <= maxPrice;
              }

              if (filterType === "departure") {
                const rideTime = new Date(`2024-12-24 ${ride.time}`);
                return rideTime >= departureTime;
              }

              return true;
            });

            return (
              <div className="m-10 flex gap-10">
                <RideFilter
                  filterType={filterType}
                  setFilterType={setFilterType}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  departureTime={departureTime}
                  setDepartureTime={setDepartureTime}
                />

                <RidePageContent rides={filteredRides} />
              </div>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}

export default RiderPage;

export async function loader() {
  const userId = localStorage.getItem("userId");

  return {
    rides: fetch(`http://localhost/api/rides/rides?user_id=${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json()),
  };
}
