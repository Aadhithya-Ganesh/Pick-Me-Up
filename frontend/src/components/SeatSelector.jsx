import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";

function SeatSelector({
  seats,
  handleStepChange,
  handleSeatChange,
  chosenSeat,
}) {
  const handleContinue = () => {
    handleStepChange((prev) => prev + 1);
  };

  return (
    <div className="h-fit space-y-6 rounded-2xl border border-gray-300/70 p-10">
      <p className="text-2xl font-bold">Select Number of Seats</p>

      <div className="space-y-2">
        <label className="block font-medium">Number of Seats</label>

        <FormControl fullWidth>
          <Select
            value={chosenSeat}
            onChange={(e) => handleSeatChange(e.target.value)}
            className="rounded-xl"
          >
            {Array.from({ length: seats }, (_, i) => (
              <MenuItem key={i} value={i + 1}>
                {i + 1} {i + 1 === 1 ? "seat" : "seats"}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <p className="mt-2 text-sm text-gray-500">
          Up to {seats} seats available
        </p>
      </div>

      <button
        onClick={handleContinue}
        className="bg-primary mt-5 block w-full cursor-pointer rounded-2xl px-7 py-3 text-center font-semibold text-white transition-colors ease-in hover:bg-yellow-200"
      >
        Continue
      </button>
    </div>
  );
}

export default SeatSelector;
