import { Star, MapPin, Calendar, Clock, Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import PendingRequests from "./PendingRequest";

function RiderPageCard({ ride }) {
  const formattedDate = new Date(
    localStorage.getItem("member_since"),
  ).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex gap-8">
        {/* LEFT */}
        <div className="w-1/2 border-r border-gray-200 pr-6">
          <div className="flex items-start gap-4">
            <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-xl">
              <p className="text-xl font-bold text-white">
                {ride.driver_name[0]}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-lg font-bold">{ride.driver_name}</p>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Star className="text-primary h-4 w-4" />
                <span>Member since {formattedDate}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3">
            <MapPin className="text-primary mt-1 h-5 w-5" />
            <div className="flex flex-col text-sm font-medium text-gray-900">
              <p>{ride.origin}</p>
              <div className="my-1 ml-2 h-6 border-l border-dashed border-gray-300"></div>
              <p>{ride.destination}</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex w-1/2 flex-col justify-between pl-6">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-b border-gray-200 pb-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Calendar className="text-primary h-4 w-4" />
              <span>{ride.date}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="text-primary h-4 w-4" />
              <span>{ride.time}</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="text-primary h-4 w-4" />
              <span>{ride.seats} seats</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="text-primary h-4 w-4" />
              <span>{ride.duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-gray-600">Price per seat</p>

            <div className="flex items-center gap-1 rounded-full bg-gray-100 px-4 py-1 font-semibold">
              <DollarSign className="h-4 w-4 text-gray-600" />
              <span>{ride.price}</span>
            </div>
          </div>

          <Link
            to={`/rides/${ride.id}`}
            className="bg-primary mt-4 rounded-xl py-2 text-center font-semibold text-white transition hover:bg-yellow-300"
          >
            View details
          </Link>
        </div>
      </div>
      {ride.user_id == localStorage.getItem("userId") && (
        <PendingRequests requests={ride.pending_requests} />
      )}
    </div>
  );
}

export default RiderPageCard;
