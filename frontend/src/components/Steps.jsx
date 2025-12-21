import { Check } from "lucide-react";

function Steps({ currentStep, steps }) {
  return (
    <div className="mx-auto flex w-full max-w-2xl items-center">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <div key={step} className="flex w-full items-center">
            {/* Circle + label */}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-15 w-15 items-center justify-center rounded-full border text-xl font-semibold ${
                  isCompleted
                    ? "border-green-500 bg-green-500 text-white"
                    : isCurrent
                      ? "border-blue-500 bg-blue-500 text-white"
                      : "border-gray-200 bg-white text-gray-400"
                }`}
              >
                {isCompleted ? <Check /> : stepNumber}
              </div>
              <p
                className={`mt-2 text-lg text-gray-700 ${isCurrent || isCompleted ? "font-bold" : ""}`}
              >
                {step}
              </p>
            </div>

            {/* Connector line (skip after last step) */}
            {index !== steps.length - 1 && (
              <div
                className={`ml-4 h-px flex-1 ${
                  isCompleted ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Steps;
