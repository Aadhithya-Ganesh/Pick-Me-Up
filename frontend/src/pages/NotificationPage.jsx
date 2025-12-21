// ---
import { useEffect, useState } from "react";
import axios from "axios";
import NotificationCard from "../components/NotificationCard";
import NotificationEmpty from "../components/NotificationEmpty";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost/api/notifications/${userId}`)
      .then(res => { 
        setNotifications(res.data);
        localStorage.setItem(`notifications_last_seen_${userId}`, new Date().toISOString());
      })
      .catch(() => setNotifications([]));
  }, [userId]);

if (notifications.length === 0) {
    return <NotificationEmpty />;
  }

  return (
    <div className="space-y-5">
      {notifications.map((n) => (
        <NotificationCard key={n.id} notification={n} />
      ))}
    </div>
  );
}