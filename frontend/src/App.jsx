import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Rootpage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NavbarRootPage from "./pages/NavbarRootPage";
import ModeSwitchContextProvider from "./context/ModeSwitchContext";

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
            { path: "/dashboard", element: <Dashboard /> },
          ],
        },
        { path: "login", element: <LoginPage /> },
        { path: "signup", element: <SignupPage /> },
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
