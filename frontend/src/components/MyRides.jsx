import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import BackdropLoader from "../utils/BackdropLoader";
import RiderPageCard from "./RiderPageCard";
import { Car } from "lucide-react";

export default function MyRides() {
  const { data } = useLoaderData();

  return (
    <div className="m-8">
      <p className="mb-6 text-2xl font-bold">My Rides</p>

      <Suspense fallback={<BackdropLoader />}>
        <Await resolve={data}>
          {(rides) =>
            rides.length === 0 ? (
              <div className="w-full rounded-2xl border border-gray-200 p-20">
                <div className="m-auto flex w-fit items-center gap-5">
                  <Car size={48} color="#b8b7b7" />
                  <span className="inline text-center text-2xl font-semibold text-gray-500">
                    No Rides Yet.
                  </span>
                </div>
              </div>
            ) : (
              <ul className="">
                {rides.map((ride) => (
                  <li key={ride.id} className="mb-6">
                    <RiderPageCard ride={ride} />
                    
                  </li>
                ))}
              </ul>
            )
          }
        </Await>
      </Suspense>
    </div>
  );
}

export async function loader() {
  const userId = localStorage.getItem("userId");

  return {
    data: fetch(`http://localhost/api/rides/my-rides?user_id=${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json()),
  };
}
