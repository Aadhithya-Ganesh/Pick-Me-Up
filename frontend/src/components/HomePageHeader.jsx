import { NavLink } from "react-router";
import RideSearchForm from "./RideSearchForm";

function HomePageHeader() {
  return (
    <div className="bg-primary p-20">
      <p className="text-text m-auto w-[70%] text-center text-6xl font-bold">
        Travel Together, Save Together
      </p>
      <p className="text-text mx-auto mt-5 w-[50%] text-center text-xl">
        Find affordable rides or offer your empty seats. Make travel sustainable
        and social.
      </p>
      <RideSearchForm />
      <div className="m-auto mt-10 flex w-[40%] justify-center gap-10">
        <NavLink
          to="/rides"
          className="bg-background text-text cursor-pointer rounded-xl px-6 py-3 font-bold shadow-2xl transition-colors ease-in hover:bg-gray-200"
        >
          Find a Ride
        </NavLink>
        <NavLink
          to="/offer-ride"
          className="bg-background text-text cursor-pointer rounded-xl px-6 py-3 font-bold shadow-2xl transition-colors ease-in hover:bg-gray-200"
        >
          Offer a Ride & Earn Money
        </NavLink>
      </div>
    </div>
  );
}

export default HomePageHeader;
