import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Rootpage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NavbarRootPage from "./pages/NavbarRootPage";

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
            { index: true, element: <LandingPage /> },
            { path: "home", element: <HomePage /> },
          ],
        },
        { path: "login", element: <LoginPage /> },
        { path: "signup", element: <SignupPage /> },
      ],
    },
  ]);

  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
