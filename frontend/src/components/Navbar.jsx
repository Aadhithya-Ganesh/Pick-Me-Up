import axios from "axios";
import { User2, LogOut, Bell } from "lucide-react";
import { NavLink, useNavigate, useSubmit } from "react-router-dom";
import Logo from "./Logo";
import { Menu, MenuItem } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import maleAvatar from "../assets/MaleUser.png";
import femaleAvatar from "../assets/FemaleUser.png";
import defaultAvatar from "../assets/User.png";

function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId,setUserId] = useState(localStorage.getItem("userId"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [gender, setGender] = useState(localStorage.getItem("gender"));

  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  const submit = useSubmit();

  const lastSeenKey = useMemo(() => {
    return userId? `notifications_last_seen_${userId}` : null;
  }, [userId]);

  const syncAuthFromStorage = () => {
    setToken(localStorage.getItem("token"));
    setUserId(localStorage.getItem("userId"));
    setUsername(localStorage.getItem("username"));
    setGender(localStorage.getItem("gender"));
  }

  useEffect(() => {
    syncAuthFromStorage();
  }, []);
  useEffect(() => {
    window.addEventListener("storage", syncAuthFromStorage);
    return () => window.removeEventListener("storage", syncAuthFromStorage);
  }, []);
  
  // Notification fetch
  const fetchNotifications =  async () => {
    if (!token || !userId) return;
    try {
      const res = await axios.get(`http://localhost/api/notifications/${userId}`);
      setNotifications(res.data);
    } catch {
      setNotifications([]);
    }
  };

  useEffect(() => {
    fetchNotifications();
    if (!token || !userId) return;
    const interval = setInterval(fetchNotifications, 5000);
    return() => clearInterval(interval);
  }, [token, userId]);

  // Immediate refresh when notifies
  useEffect(() => {
    const forceRefresh = () => fetchNotifications();
    window.addEventListener("notifications:refresh", forceRefresh);
      return () =>
        window.removeEventListener("notifications:refresh", forceRefresh);
    }, [token, userId]);

    const lastSeen = lastSeenKey ? localStorage.getItem(lastSeenKey) : null;
    const newCount = useMemo(() => {
      if(!userId) return 0;
      if(!lastSeen) return notifications.length;

      const lastSeenDate = new Date(lastSeen);
      return notifications.filter((n) => 
        new Date(n.created_at) > lastSeenDate).length;
    }, [notifications, lastSeen, userId]);

  let AvatarIcon;
  if (gender === "Male") AvatarIcon = maleAvatar;
  else if (gender === "Female") AvatarIcon = femaleAvatar;
  else AvatarIcon = defaultAvatar;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    submit(null, { method: "post", action: "/logout" });
    setTimeout(() => syncAuthFromStorage(), 0);
  };

return (
    <div className="sticky top-0 z-50 flex items-center justify-between bg-background px-10 backdrop-blur">
      <Logo />

      {/* CENTER LINKS */}
      <div className="flex w-[40%] items-center justify-center gap-6 font-bold">
        {[
          { to: "/", label: "Home" },
          { to: "/dashboard", label: "Dashboard" },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group relative inline-flex items-center justify-center rounded-xl px-4 py-2 transition ${
                isActive
                  ? "text-primary bg-secondary"
                  : "hover:text-primary hover:bg-secondary text-text"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    
      <div className="flex items-center gap-4">
      {!token ? (
        <>
        <ul className="flex items-center gap-2">
          <li>
            <NavLink
              to="/login"
              className="block cursor-pointer rounded-[48px] bg-transparent px-[15px] py-1 text-[12px] font-bold shadow-xl hover:bg-gray-100 md:px-6 md:py-2 md:text-sm"
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
        </>
      ): (
        <>
        <NavLink
            to="/dashboard/notifications"
            className="relative"
          >
            <Bell size={25} />
            {newCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {newCount}
              </span>
            )}
          </NavLink>

          <button
            type="button"
            onClick={handleMenuOpen}
            className="inline-block cursor-pointer rounded-full p-1"
          >
            <img
              src={AvatarIcon}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
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
            <div className="px-4 py-3">
              <p className="truncate text-sm font-semibold text-gray-900">
                {username || "Unknown User"}
              </p>
            </div>
            <hr className="mx-3 my-1 border-gray-200" />
            
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
    </div>
);
}

export default Navbar;