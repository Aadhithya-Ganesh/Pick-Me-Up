import FeatureCards from "./FeatureCards";

function HomePageFeatures({ heading, content, cards }) {
  return (
    <div className="pt-30">
      <p className="text-text text-center text-4xl font-bold">{heading}</p>
      <p className="text-text mt-5 text-center text-lg">{content}</p>
      <div className="mx-auto my-20 grid w-[80%] grid-cols-3 gap-10">
        {cards.map((item, index) => (
          <FeatureCards
            key={index}
            icon={item.icon}
            heading={item.heading}
            content={item.content}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePageFeatures;
