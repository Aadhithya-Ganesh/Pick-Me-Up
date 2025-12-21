import { Bell } from "lucide-react";

export default function NotificationCard({ notification }) {
  return (
    <div
      className="flex gap-4 p-4 rounded-xl border shadow-sm transition bg-yellow-50 border-yellow-400">
        <Bell ClassName ="bg-white border-gray-200"/>
      <div>
        <p className="font-medium">{notification.message}</p>
        <p className="text-sm text-gray-500">
          {new Date(notification.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
