import { NavLink } from "react-router";
import { Car } from "lucide-react";

function Logo() {
  return (
    <NavLink to="/">
      <div className="flex items-center gap-3 py-5">
        <div className="bg-primary inline-block rounded-2xl p-3">
          <Car color="#ffffff" />
        </div>
        <p className="text-2xl font-bold">PickMeUp</p>
      </div>
    </NavLink>
  );
}

export default Logo;
