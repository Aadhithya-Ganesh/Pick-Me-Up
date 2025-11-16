import { cloneElement } from "react";

function FeatureCards({ icon, heading, content, index }) {
  const colors = [
    { text: "text-blue-500", bg: "bg-blue-100" },
    { text: "text-green-500", bg: "bg-green-100" },
  ];

  const c = colors[index % colors.length];

  const IconWithColor = cloneElement(icon, {
    className: `w-8 h-8 ${c.text}`,
  });

  return (
    <div className="flex flex-col items-center rounded-2xl border border-gray-200 px-5 py-10">
      <div className={`${c.bg} rounded-full p-5`}>{IconWithColor}</div>
      <p className="text-text mt-5 text-2xl font-bold">{heading}</p>
      <p className="text-text m-auto mt-5 w-[55%] text-center text-lg">
        {content}
      </p>
    </div>
  );
}

export default FeatureCards;
