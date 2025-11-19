import { Star, MapPin, Calendar, Clock, Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

function RiderPageCard({ ride }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-8">
      <div className="flex">
        <div className="mr-5 w-full border-r-2 border-gray-200/70">
          <div className="flex items-start gap-10">
            <div className="bg-primary w-fit rounded-2xl p-3">
              <p className="w-8 text-center text-2xl font-bold text-white">
                {ride.driver.name[0]}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-lg font-bold">{ride.driver.name}</p>
              <div className="flex items-center gap-3">
                <Star color="#ffdd1f" className="h-5 w-5" />
                <p>
                  <span className="font-semibold">{ride.driver.rating}</span>{" "}
                  <span className="text-gray-400">| {ride.car}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-7 ml-2 flex gap-5">
            <MapPin color="#ffdd1f" />
            <div className="flex flex-col gap-2">
              <p className="font-semibold">{ride.from}</p>
              <div className="h-10 w-10 border-l-2 border-dashed border-gray-300"></div>
              <p className="font-semibold">{ride.to}</p>
            </div>
          </div>
        </div>
        <div className="w-[50%]">
          <div className="grid grid-cols-2 grid-rows-2 gap-8 border-b-2 border-gray-200/80 pb-5">
            <div className="flex items-center gap-3">
              <Calendar className="text-primary h-5 w-5" />
              <p>{ride.date}</p>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-primary h-5 w-5" />
              <p>{ride.time}</p>
            </div>
            <div className="flex items-center gap-3">
              <Users className="text-primary h-5 w-5" />
              <p>
                {ride.seats} seat{ride.seats == 1 ? "" : "s"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-primary h-5 w-5" />
              <p>{ride.duration}</p>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between">
            <p className="text-gray-400">Price per seat</p>
            <div className="flex items-center rounded-3xl bg-gray-200 px-4 py-2">
              <DollarSign className="h-4 w-4" />
              <p>{ride.price}</p>
            </div>
          </div>
          <Link
            to={`/rides/${ride.id}`}
            className="bg-primary mt-4 block w-full cursor-pointer rounded-2xl px-3 py-2 text-center font-semibold text-white transition-colors ease-in hover:bg-yellow-200"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RiderPageCard;
