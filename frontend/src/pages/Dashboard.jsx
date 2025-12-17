import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
  const username = localStorage.getItem("username");

  return (
    <div className="w-full">
      <div className="bg-primary mb-10 p-20">
        <h1 className="text-4xl font-bold text-white">{username}</h1>
      </div>

      <div className="m-6 mb-10 flex w-fit gap-2 rounded-lg bg-gray-100 p-1">
        <NavLink
          to="notifications"
          className={({ isActive }) =>
            `rounded-lg px-6 py-1 font-semibold transition ${
              isActive
                ? "bg-white text-black shadow"
                : "text-gray-500 hover:text-black"
            }`
          }
        >
          Notifications
        </NavLink>

        <NavLink
          to="booking"
          className={({ isActive }) =>
            `rounded-lg px-6 py-1 font-semibold transition ${
              isActive
                ? "bg-white text-black shadow"
                : "text-gray-500 hover:text-black"
            }`
          }
        >
          My Bookings
        </NavLink>

        <NavLink
          to="rides"
          className={({ isActive }) =>
            `rounded-lg px-6 py-1 font-semibold transition ${
              isActive
                ? "bg-white text-black shadow"
                : "text-gray-500 hover:text-black"
            }`
          }
        >
          My Rides
        </NavLink>

        <NavLink
          to="profile"
          className={({ isActive }) =>
            `rounded-lg px-6 py-1 font-semibold transition ${
              isActive
                ? "bg-white text-black shadow"
                : "text-gray-500 hover:text-black"
            }`
          }
        >
          My Profile
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}
