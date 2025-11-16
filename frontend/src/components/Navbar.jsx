import { User2, LogOut } from "lucide-react";
import { NavLink, useNavigate, useSubmit } from "react-router-dom";
import Logo from "./Logo";
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";

function Navbar() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const submit = useSubmit();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    // Trigger React Router action on /logout
    submit(null, { method: "post", action: "/logout" });
  };

  return (
    <div className="bg-background sticky top-0 z-100 flex items-center justify-between px-10 backdrop-blur supports-backdrop-filter:bg-white/80">
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
              `group relative inline-flex items-center justify-center rounded-xl px-4 py-2 shadow-2xl transition-all duration-300 ease-in-out ${
                isActive
                  ? "text-primary bg-secondary shadow-sm backdrop-blur-sm"
                  : "hover:text-primary hover:bg-secondary text-text"
              }`
            }
          >
            <span className="relative z-10">{label}</span>
          </NavLink>
        ))}
      </div>

      {!token && (
        <ul className="flex items-center gap-2">
          <li>
            <NavLink
              to="/login"
              className="block cursor-pointer rounded-[48px] bg-transparent px-[15px] py-1 text-[12px] font-bold shadow-xl hover:bg-[rgb(252,248,248)] md:px-6 md:py-2 md:text-sm"
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className="bg-accent block cursor-pointer rounded-[48px] px-[15px] py-1 text-[12px] font-bold text-white shadow-xl hover:bg-yellow-300 md:px-6 md:py-2 md:text-sm"
            >
              Signup
            </NavLink>
          </li>
        </ul>
      )}

      {token && (
        <>
          {/* Avatar that opens the menu */}
          <button
            type="button"
            onClick={handleMenuOpen}
            className="bg-primary inline-block rounded-2xl p-3"
          >
            <User2 color="#ffffff" />
          </button>

          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 6,
              sx: {
                mt: 1.5,
                borderRadius: 3,
                minWidth: 220,
                paddingY: 1,
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {/* User Info Header */}
            <div className="px-4 py-3">
              <p className="text-sm text-gray-500">Signed in as</p>
              <p className="truncate text-sm font-semibold text-gray-900">
                {username || "Unknown User"}
              </p>
            </div>
            <hr className="mx-3 my-1 border-gray-200" />

            {/* Account */}
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate("/profile");
              }}
              sx={{
                fontSize: "0.875rem",
                paddingY: "10px",
                paddingX: "16px",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <User2 className="mr-2 size-4 text-indigo-500" />
              Account
            </MenuItem>

            {/* Logout */}
            <MenuItem
              disableGutters
              sx={{
                paddingY: 0,
                paddingX: 0,
              }}
            >
              <button
                type="button"
                onClick={handleLogoutClick}
                className="flex w-full cursor-pointer items-center px-4 py-2 text-sm hover:bg-red-50"
              >
                <LogOut className="mr-2 size-4 text-red-500" />
                Logout
              </button>
            </MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
}

export default Navbar;
