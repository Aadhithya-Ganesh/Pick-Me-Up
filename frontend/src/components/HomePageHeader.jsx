import { NavLink } from "react-router";
import { Search } from "lucide-react";

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
      <div className="bg-background m-auto mt-10 grid w-[80%] grid-cols-11 justify-around gap-4 rounded-2xl p-5">
        <input
          type="text"
          placeholder="From (eg. New York)"
          className="focus:border-primary col-span-3 rounded-xl border border-gray-200 p-2 focus:outline-none"
        ></input>
        <input
          type="text"
          placeholder="To (eg. Boston)"
          className="focus:border-primary col-span-3 rounded-xl border border-gray-200 p-2 focus:outline-none"
        ></input>
        <input
          type="datetime-local"
          placeholder="To (eg. Boston)"
          className="focus:border-primary col-span-3 rounded-xl border border-gray-200 p-2 focus:outline-none"
        ></input>
        <button className="bg-accent hover:border-accent hover:text-accent hover:bg-background col-span-2 flex cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-2 text-white transition-colors ease-in hover:border">
          <Search className="h-5 w-5" />
          <p className="font-bold">Search</p>
        </button>
      </div>
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
