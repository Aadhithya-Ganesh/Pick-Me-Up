import { Outlet } from "react-router-dom";
import Navbar from "./../components/Navbar";
import Footer from "../components/Footer";

export default function NavbarRootPage() {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Navbar />
      <div className="grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
