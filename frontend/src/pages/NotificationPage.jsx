import { useEffect, useState } from "react";
import axios from "axios";
import NotificationCard from "../components/NotificationCard";
import NotificationEmpty from "../components/NotificationEmpty";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  // get user id from profile / localStorage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:8003/api/notifications/${userId}`)
      .then(res => setNotifications(res.data))
      .catch(() => {
        // demo fallback
        setNotifications([
          {
            id: "demo-1",
            message: "Your booking has been created -(Manually typed demo)",
            is_read: false,
            created_at: new Date().toISOString(),
          },
        ]);
      });
  }, [userId]);

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Notifications</h1>

      {notifications.length === 0 ? (
        <NotificationEmpty />
      ) : (
        notifications.map((n) => (
          <NotificationCard key={n.id} notification={n} />
        ))
      )}
    </div>
  );
}

  //   .catch(err => console.error(err));
  // }, [token]);

  
//   return (
//     <div className="space-y-4">

//       {/* Header */}
//       <div className="flex items-center gap-2">
//         <span className="text-2xl">🔔</span>
//         <h2 className="text-2xl font-bold">Notifications</h2>
//       </div>

//       {/* Empty State */}
//       {notifications.length === 0 && (
//         <div className="text-gray-500 mt-6">
//           No notifications yet
//         </div>
//       )}

//       {/* Notification Cards */}
//       {notifications.map(n => (
//         <div
//           key={n.id}
//           className={`relative p-4 rounded-xl border-l-4 shadow-sm transition
//             ${n.is_read
//               ? "bg-white border-gray-200"
//               : "bg-yellow-50 border-yellow-400"}
//           `}
//         >
//           {/* Unread dot */}
//           {!n.is_read && (
//             <span className="absolute top-4 right-4 h-2 w-2 bg-yellow-500 rounded-full"></span>
//           )}

//           <p className="font-semibold text-gray-900">
//             {n.message}
//           </p>

//           <p className="text-sm text-gray-500 mt-1">
//             {new Date(n.created_at).toLocaleString()}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }
