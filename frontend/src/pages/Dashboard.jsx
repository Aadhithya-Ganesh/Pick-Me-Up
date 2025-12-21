import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="p-6 w-full">
      <div className="dashboard-banner mb-6">
        <h2 className="text-xl font-bold">Welcome back!</h2>
        <p className="text-gray-500">Your journey begins here.</p>
      </div>

      <div className="inline-flex rounded-full bg-gray-100 p-1 mb-8">
        <NavLink 
          to="notifications"
          className = {({ isActive }) =>
            `px-6 py-2 rounded-full text-sm font-semibold transition ${
              isActive
                ? "bg-black shadow text-white"
                : "text-white-500 hover:bg-yellow-200"
            }`
          }
        >
          NOTIFICATIONS
        </NavLink>

        <NavLink
          to="booking"
          className = {({ isActive }) =>
            `px-6 py-2 rounded-full text-sm font-semibold transition ${
              isActive
                ? "bg-black shadow text-white"
                : "text-white-500 hover:bg-yellow-200"
            }`
          }
        >
          MY BOOKINGS
        </NavLink>

        <NavLink
          to="rides"
          className = {({ isActive }) =>
            `px-6 py-2 rounded-full text-sm font-semibold transition ${
              isActive
                ? "bg-black shadow text-white"
                : "text-white-500 hover:bg-yellow-200"
            }`
          }
        >
          MY RIDES
        </NavLink>

        <NavLink
          to="profile"
          className = {({ isActive }) =>
            `px-6 py-2 rounded-full text-sm font-semibold transition ${
              isActive
                ? "bg-black shadow text-white"
                : "text-white-500 hover:bg-yellow-200"
            }`
          }
        >
          MY PROFILE
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
