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
    <div className="my-8 flex flex-col items-center">
      <div className={`${c.bg} rounded-full p-5`}>{IconWithColor}</div>
      <p className="text-neutral-primary mt-5 text-2xl font-bold">{heading}</p>
      <p className="text-neutral-secondary m-auto mt-5 w-[55%] text-center text-lg">
        {content}
      </p>
    </div>
  );
}

export default FeatureCards;
