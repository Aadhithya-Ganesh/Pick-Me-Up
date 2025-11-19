import { Search } from "lucide-react";

function RideSearchForm() {
  return (
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
  );
}

export default RideSearchForm;
