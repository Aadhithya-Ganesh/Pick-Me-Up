import { NavLink } from "react-router";
import { Search } from "lucide-react";

function HomePageHeader() {
  return (
    <div className="bg-primary p-20">
      <p className="text-on-primary m-auto w-[70%] text-center text-6xl font-bold">
        Travel Together, Save Together
      </p>
      <p className="text-on-secondary mx-auto mt-5 w-[50%] text-center text-xl">
        Find affordable rides or offer your empty seats. Make travel sustainable
        and social.
      </p>
      <div className="m-auto mt-10 grid w-[80%] grid-cols-11 justify-around gap-4 rounded-2xl bg-white p-5">
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
        <button className="bg-primary hover:border-primary hover:text-primary col-span-2 flex cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-2 text-white transition-colors ease-in hover:border hover:bg-white">
          <Search className="h-5 w-5" />
          <p className="font-bold">Search</p>
        </button>
      </div>
      <div className="m-auto mt-10 flex w-[40%] justify-center gap-10">
        <button className="cursor-pointer rounded-xl bg-white px-6 py-3 font-bold text-black shadow-2xl transition-colors ease-in hover:bg-gray-200">
          Find a Ride
        </button>
        <button className="bg-primary hover:text-primary cursor-pointer rounded-xl px-5 py-2 font-bold text-white shadow-2xl transition-colors ease-in hover:bg-white">
          Offer a Ride & Earn Money
        </button>
      </div>
    </div>
  );
}

export default HomePageHeader;
