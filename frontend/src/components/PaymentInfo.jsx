import { MapPin, Clock, Calendar } from "lucide-react";

function PaymentInfo({ ride, seats }) {
  return (
    <div className="sticky top-40 col-span-2 h-fit rounded-2xl border border-gray-300/70 p-5">
      <div className="border-b border-gray-300/70 pb-5">
        <p className="mb-7 text-2xl font-semibold">Payment summary</p>
        <div className="mt-5 flex gap-5">
          <MapPin color="#ffdd1f" />
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">{ride.from}</p>
            <div className="h-10 w-10 border-l-2 border-dashed border-gray-300"></div>
            <p className="text-lg font-semibold">{ride.to}</p>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-5">
          <div className="flex items-center gap-5">
            <Calendar className="text-primary" />
            <p>{ride.date}</p>
          </div>
          <div className="flex items-center gap-5">
            <Clock className="text-primary" />
            <p>{ride.time}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2 border-b border-gray-300/70 pb-5">
        <div className="flex justify-between">
          <p className="text-gray-400">Price per seat</p>
          <p>${ride.price}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-400">Number of seats</p>
          <p>{seats}</p>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <p className="text-xl font-bold">Total</p>
        <p className="text-primary text-3xl font-bold">${ride.price * seats}</p>
      </div>
    </div>
  );
}

export default PaymentInfo;
