import { Link } from "react-router-dom";
import { Car, Facebook, Twitter, Instagram, Mail } from "lucide-react";
import Logo from "./../components/Logo";

export const Footer = () => {
  return (
    <footer className="border border-t border-gray-200">
      <div className="mx-10 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}

          <Logo />

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/rides"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Find a Ride
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 font-semibold">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="border-border hover:bg-primary flex h-10 w-10 items-center justify-center rounded-lg border text-gray-400 transition-colors hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="border-border hover:bg-primary flex h-10 w-10 items-center justify-center rounded-lg border text-gray-400 transition-colors hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="border-border hover:bg-primary flex h-10 w-10 items-center justify-center rounded-lg border text-gray-400 transition-colors hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="border-border hover:bg-primary flex h-10 w-10 items-center justify-center rounded-lg border text-gray-400 transition-colors hover:text-white"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="text-muted-foreground mt-12 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} RideShare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
