import { Outlet } from "react-router-dom";
import Navbar from "./../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "./../utils/ScrollToTop";

export default function NavbarRootPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <div className="grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
