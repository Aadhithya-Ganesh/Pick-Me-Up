// function Dashboard() {
//   return <>lol</>;
// }

// export default Dashboard;
// import { Navigate } from "react-router-dom";

// export default function Protected({ children }) {
//   const token = localStorage.getItem("token");
//   if (!token) return <Navigate to="/login" replace />;
//   return children;
// }

import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="p-6 w-full">

      {/* Dashboard Banner */}
      <div className="dashboard-banner">
        <h2>Welcome back!</h2>
        <p>“Your journey begins here.”</p>
      </div>

      {/* ------ TABS HEADER ------ */}
      <div className="flex gap-6 border-b pb-3 mb-6 text-lg font-semibold">

        <NavLink 
          to="notifications"
          className={({ isActive }) =>
            isActive ? "text-primary border-b-2 border-primary pb-2" : "hover:text-primary"
          }
        >
          Notifications
        </NavLink>

        <NavLink 
          to="booking"
          className={({ isActive }) =>
            isActive ? "text-primary border-b-2 border-primary pb-2" : "hover:text-primary"
          }
        >
          My Bookings
        </NavLink>

        <NavLink 
          to="rides"
          className={({ isActive }) =>
            isActive ? "text-primary border-b-2 border-primary pb-2" : "hover:text-primary"
          }
        >
          My Rides
        </NavLink>

        <NavLink 
          to="profile"
          className={({ isActive }) =>
            isActive ? "text-primary border-b-2 border-primary pb-2" : "hover:text-primary"
          }
        >
          My Profile
        </NavLink>

      </div>

      {/* ------ CONTENT LOADS HERE ------ */}
      <Outlet />

    </div>
  );
}
