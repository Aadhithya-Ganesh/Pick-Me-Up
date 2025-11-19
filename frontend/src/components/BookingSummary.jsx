import { useState } from "react";
import { useNavigate } from "react-router";

function BookingSummary({ handleStepChange, location }) {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (agreed) {
      navigate(`/booking/1`);
    }
  };

  const handleBack = () => {
    handleStepChange((prev) => prev - 1);
    ``;
  };

  return (
    <div className="sticky top-40 col-span-2 h-fit space-y-6 rounded-2xl border border-gray-300/70 p-10">
      <p className="text-2xl font-semibold">Booking Summary</p>

      <div className="flex w-100 flex-col gap-3">
        <div className="flex justify-between gap-20">
          <p className="text-gray-400">Pick up:</p>
          <p>{location.pickup}</p>
        </div>
        <div className="flex justify-between gap-20">
          <p className="text-gray-400">Drop off:</p>
          <p>{location.drop}</p>
        </div>
      </div>

      <label className="flex cursor-pointer items-start gap-3 select-none">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 h-5 w-5 cursor-pointer"
        />
        <span className="text-gray-700">
          I agree to the{" "}
          <span className="cursor-pointer text-blue-600 underline">
            terms and conditions
          </span>{" "}
          and{" "}
          <span className="cursor-pointer text-blue-600 underline">
            cancellation policy
          </span>
        </span>
      </label>

      <div className="flex gap-10">
        {/* Back */}
        <button
          type="button"
          onClick={handleBack}
          className="text-text mt-5 block w-full cursor-pointer rounded-2xl bg-transparent px-7 py-3 text-center font-semibold shadow-lg hover:bg-gray-100"
        >
          Back
        </button>

        {/* Continue */}
        <button
          type="button"
          onClick={handleContinue}
          disabled={!agreed}
          className={`mt-5 block w-full cursor-pointer rounded-2xl px-7 py-3 text-center font-semibold shadow-lg transition-colors ${
            agreed
              ? "bg-primary text-white hover:bg-yellow-200"
              : "cursor-not-allowed bg-gray-300 text-gray-500"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default BookingSummary;
