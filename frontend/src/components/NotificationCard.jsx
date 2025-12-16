import { Bell } from "lucide-react";

export default function NotificationCard({ notification }) {
  const isUnread = !notification.is_read;

  return (
    <div
      className={`flex gap-4 p-4 rounded-xl border shadow-sm transition
        ${isUnread ? "bg-yellow-50 border-yellow-400" : "bg-white border-gray-200"}
      `}
    >
      <div className="mt-1">
        <Bell
          className={`w-5 h-5 ${
            isUnread ? "text-yellow-600" : "text-gray-400"
          }`}
        />
      </div>

      <div className="flex-1">
        <p className="font-medium text-gray-900">
          {notification.message}
        </p>

        <p className="text-sm text-gray-500 mt-1">
          {new Date(notification.created_at).toLocaleString()}
        </p>
      </div>

      {isUnread && (
        <span className="h-2 w-2 rounded-full bg-yellow-500 mt-2" />
      )}
    </div>
  );
}
