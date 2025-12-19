import { BellOff } from "lucide-react";

export default function NotificationEmpty() {
  return (
    <div className="w-full rounded-2xl border border-gray-200 p-20">
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <BellOff className="w-12 h-12 mb-4" />
        <p className="text-lg font-semibold">No notifications yet!</p>
        <p className="text-sm">Your Bookings and Ride updates will appear here.</p>
      </div>
    </div>
  );
}
