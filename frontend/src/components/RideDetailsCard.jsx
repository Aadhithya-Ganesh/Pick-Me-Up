import {
  MapPin,
  Star,
  Calendar,
  Clock,
  Users,
  Car,
  Hourglass,
  DollarSign,
} from "lucide-react";

function RideDetailsCard({ ride }) {
  return (
    <div className="h-fit rounded-2xl border border-gray-300/70 p-10">
      <p className="mb-8 text-3xl font-bold">Trip Details</p>
      <div className="mt-5 flex border-b border-gray-300/70 pb-9">
        <div className="w-[50%]">
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
                  <span className="text-gray-400">
                    | Member since {ride.driver.member_since}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 ml-2 flex gap-5">
          <MapPin color="#ffdd1f" />
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">{ride.from}</p>
            <div className="h-10 w-10 border-l-2 border-dashed border-gray-300"></div>
            <p className="text-lg font-semibold">{ride.to}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-8 p-5">
        {[
          {
            id: 1,
            icon: <Calendar className="text-primary" />,
            heading: "Date",
            content: ride.date,
          },
          {
            id: 2,
            icon: <Clock className="text-primary" />,
            heading: "Departure",
            content: ride.time,
          },
          {
            id: 3,
            icon: <Users className="text-primary" />,
            heading: "Available Seats",
            content: ride.seats + " seat" + (ride.seats === 1 ? "" : "s"),
          },
          {
            id: 4,
            icon: <DollarSign className="text-primary" />,
            heading: "Price per Seat",
            content: ride.price,
          },
          {
            id: 5,
            icon: <Car className="text-primary" />,
            heading: "Vechicle",
            content: ride.car,
          },
          {
            id: 6,
            icon: <Hourglass className="text-primary" />,
            heading: "Trip duration",
            content: ride.duration,
          },
        ].map((item) => (
          <div className="flex items-center gap-5" key={item.id}>
            {item.icon}
            <div>
              <p className="text-gray-400">{item.heading}</p>
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RideDetailsCard;
