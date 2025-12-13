import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Rootpage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import LoginPage, { action as loginAction } from "./pages/LoginPage";
import SignupPage, { action as signupAction } from "./pages/SignupPage";
import RiderPage from "./pages/RiderPage";
import { action as logoutAction } from "./pages/Logout";
import DriverPage from "./pages/DriverPage";
import NavbarRootPage from "./pages/NavbarRootPage";
import ModeSwitchContextProvider from "./context/ModeSwitchContext";
import RideDetailsPage from "./pages/RideDetailsPage";
import BookingPage from "./pages/BookingPage";
import BookingDetails from "./pages/BookingDetails";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Rootpage />,
      errorElement: <ErrorPage />,
      id: "root",
      children: [
        {
          path: "",
          element: <NavbarRootPage />,
          children: [
            { index: true, element: <HomePage /> },
            {
              path: "/dashboard",
              element: <Dashboard />,
              children: [
                { index: true, element: <div>No Notifications Yet</div> },
                { path: "booking", element: <div>Your bookings...</div> },
                { path: "rides", element: <div>Your ride history....</div> },
                {
                  path: "notifications",
                  element: <div>No Notifications Yet</div>,
                },
                { path: "profile", element: <ProfilePage /> },
              ],
            },
            { path: "/profile", element: <ProfilePage /> },

            { path: "/rides", element: <RiderPage /> },
            { path: "/offer-ride", element: <DriverPage /> },
            { path: "/rides/:rideId", element: <RideDetailsPage /> },
            { path: "/book/:rideId", element: <BookingPage /> },
            { path: "/booking/:bookingId", element: <BookingDetails /> },
          ],
        },
        { path: "login", element: <LoginPage />, action: loginAction },
        { path: "signup", element: <SignupPage />, action: signupAction },
        { path: "logout", action: logoutAction },
      ],
    },
  ]);

  return (
    <ModeSwitchContextProvider>
      <RouterProvider router={routes}></RouterProvider>
    </ModeSwitchContextProvider>
  );
}

export default App;
