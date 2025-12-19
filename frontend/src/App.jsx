import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Rootpage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import LoginPage, { action as loginAction } from "./pages/LoginPage";
import SignupPage, { action as signupAction } from "./pages/SignupPage";
import RiderPage, { loader as rideLoader } from "./pages/RiderPage";
import { action as logoutAction } from "./pages/Logout";
import DriverPage from "./pages/DriverPage";
import NavbarRootPage from "./pages/NavbarRootPage";
import RideDetailsPage, {
  loader as rideDetailsLoader,
} from "./pages/RideDetailsPage";
import BookingPage from "./pages/BookingPage";
import BookingDetails, {
  loader as bookingDetailsLoader,
} from "./pages/BookingDetails";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationPage";
import BackdropLoader from "./utils/BackdropLoader";
import MyRides, { loader as myRideLoader } from "./components/MyRides";
import MyBooking, { loader as myBookingLoader } from "./components/MyBooking";
import ProtectedRoute from "./utils/ProtectedRoute";

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
              element: (
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              ),                
              children: [
                { index: true, element: <NotificationsPage /> },
                { path: "notifications", element: <NotificationsPage /> },
                {
                  path: "booking",
                  element: <MyBooking />,
                  loader: myBookingLoader,
                },
                { path: "rides", element: <MyRides />, loader: myRideLoader },
                { path: "profile", element: <ProfilePage /> },
              ],
            },
            { path: "/profile", element: <ProfilePage /> },
            { path: "/rides", element: <RiderPage />, loader: rideLoader },
            { path: "/offer-ride", element: <DriverPage /> },
            {
              path: "/rides/:rideId",
              element: <RideDetailsPage />,
              loader: rideDetailsLoader,
            },
            {
              path: "/book/:rideId",
              element: <BookingPage />,
              loader: rideDetailsLoader,
            },
            {
              path: "/booking/:bookingId",
              element: <BookingDetails />,
              loader: bookingDetailsLoader,
            },
          ],
        },
        { path: "login", element: <LoginPage />, action: loginAction },
        { path: "signup", element: <SignupPage />, action: signupAction },
        { path: "logout", action: logoutAction },
      ],
    },
  ]);

  return (
    <RouterProvider
      router={routes}
      fallbackElement={<BackdropLoader />}
    ></RouterProvider>
  );
}

export default App;
