import { useState } from "react";
import RidePageHeader from "../components/RidePageHeader";
import RideFilter from "../components/RideFilter";
import RidePageContent from "../components/RidePageContent";

function RiderPage() {
  const [filterType, setFilterType] = useState("price");
  const [maxPrice, setMaxPrice] = useState(50);
  const [departureTime, setDepartureTime] = useState(new Date());

  const rides = [
    {
      id: 1,
      driver: { name: "Michael Brown", rating: 4.7, member_since: "2024" },
      car: "Chevrolet Malibu",
      from: "Austin, TX",
      to: "Houston, TX",
      date: "2024-12-24",
      time: "11:30 AM",
      seats: 3,
      duration: "2h 40m",
      price: 15,
      distance: 165,
    },
    {
      id: 2,
      driver: { name: "Sarah Johnson", rating: 4.9, member_since: "2024" },
      car: "Toyota Camry",
      from: "Austin, TX",
      to: "Houston, TX",
      date: "2024-12-24",
      time: "02:15 PM",
      seats: 2,
      duration: "2h 45m",
      price: 20,
      distance: 165,
    },
    {
      id: 3,
      driver: { name: "David Wilson", rating: 4.5, member_since: "2024" },
      car: "Honda Accord",
      from: "Austin, TX",
      to: "Houston, TX",
      date: "2024-12-24",
      time: "09:00 PM",
      seats: 4,
      duration: "2h 35m",
      price: 18,
      distance: 165,
    },
  ];

  // ---- FILTER LOGIC ----
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
    <>
      <RidePageHeader />
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
    </>
  );
}

export default RiderPage;
