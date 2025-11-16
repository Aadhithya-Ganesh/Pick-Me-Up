import { User2 } from "lucide-react";
import { NavLink } from "react-router";
import Logo from "./Logo";

function Navbar() {
  return (
    <div className="sticky top-0 z-100 flex items-center justify-between bg-white px-10 backdrop-blur supports-backdrop-filter:bg-white/80">
      <Logo />
      <div className="flex w-[40%] items-center justify-center gap-6 font-bold">
        {[
          { to: "/", label: "Home" },
          { to: "/dashboard", label: "Dashboard" },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group relative inline-flex items-center justify-center rounded-xl px-4 py-2 transition-all duration-300 ease-in-out ${
                isActive
                  ? "text-primary bg-yellow-100/40 shadow-sm backdrop-blur-sm"
                  : "hover:text-primary text-gray-700 hover:bg-yellow-100/70 dark:text-gray-300"
              }`
            }
          >
            <span className="relative z-10">{label}</span>
            <span className="bg-primary absolute bottom-0 left-1/2 h-0.5 w-0 transition-all duration-300 ease-in-out group-hover:left-0 group-hover:w-full"></span>
          </NavLink>
        ))}
      </div>

      <div className="bg-primary inline-block rounded-2xl p-3">
        <User2 color="#ffffff" />
      </div>
    </div>
  );
}

export default Navbar;
