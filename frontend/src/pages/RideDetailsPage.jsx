import { Suspense } from "react";
import { Await, useLoaderData, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import RideDetailsCard from "../components/RideDetailsCard";
import BackdropLoader from "../utils/BackdropLoader";
import PaymentDetails from "./../components/PaymentDetails";
import { useParams, useNavigate } from "react-router-dom";

function RideDetailsPage() {
  const { ride } = useLoaderData();
  const { rideId } = useParams();
  const navigate = useNavigate();

  const handleCancel = async () => {
    try {
      const res = await fetch(`http://localhost/api/rides/${rideId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const err = await res.json();
        return;
      }

      navigate("/dashboard");
    } catch (err) {
      console.error("Cancel error:", err);
    }
  };

  return (
    <>
      <div>
        <Link
          to="/rides"
          className="text-text hover:text-primary hover:bg-background mx-9 my-5 flex w-fit cursor-pointer items-center gap-5 rounded-2xl p-4 font-bold transition-colors ease-in"
        >
          <ArrowLeft className="h-4 w-4" />
          <p>Back</p>
        </Link>
      </div>

      <Suspense fallback={<BackdropLoader />}>
        <Await resolve={ride}>
          {(ride) => (
            <div className="mx-20 my-10">
              <div className="grid grid-cols-8 gap-5">
                <div
                  className={`${ride.user_id == localStorage.getItem("userId") ? "col-span-8" : "col-span-6"}`}
                >
                  <RideDetailsCard ride={ride} />
                </div>
                {ride.user_id == localStorage.getItem("userId") ? null : (
                  <PaymentDetails ride={ride} />
                )}
              </div>
              {ride.user_id != localStorage.getItem("userId") ? null : (
                <button
                  onClick={handleCancel}
                  className="mx-auto mt-10 block w-[20%] cursor-pointer rounded-2xl bg-red-500 py-2 text-xl text-white hover:bg-red-400"
                >
                  Cancel
                </button>
              )}
            </div>
          )}
        </Await>
      </Suspense>
    </>
  );
}

export default RideDetailsPage;

export function loader({ params }) {
  const rideId = params.rideId;

  return {
    ride: fetch(`http://localhost/api/rides/${rideId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json()),
  };
}
