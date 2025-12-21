import HomePageFeatures from "../components/HomePageFeatures";
import HomePageHeader from "../components/HomePageHeader";
import {
  Search,
  Star,
  Users,
  DollarSign,
  Leaf,
  Shield,
  Clock,
} from "lucide-react";

function HomePage() {
  const howItWorksCards = [
    {
      icon: <Search />,
      heading: "Search",
      content:
        "Enter your origin, destination, and travel date to find available rides.",
    },
    {
      icon: <Star />,
      heading: "Book",
      content:
        "Choose your ride, select seats, and confirm your booking instantly.",
    },
    {
      icon: <Users />,
      heading: "Travel",
      content:
        "Meet your driver, enjoy the ride, and arrive at your destination safely.",
    },
  ];

  const featuresCards = [
    {
      icon: <DollarSign />,
      heading: "Save Money",
      content:
        "Split travel costs with fellow passengers. Save up to 70% compared to other options.",
    },
    {
      icon: <Users />,
      heading: "Meet People",
      content:
        "Connect with friendly travelers. Make new friends and expand your network.",
    },
    {
      icon: <Leaf />,
      heading: "Eco-Friendly",
      content:
        "Reduce your carbon footprint. Every shared ride helps protect our planet.",
    },
    {
      icon: <Shield />,
      heading: "Safe & Secure",
      content:
        "Verified drivers and passengers. Travel with confidence and peace of mind.",
    },
    {
      icon: <Clock />,
      heading: "Flexible",
      content:
        "Book instantly or plan ahead. Choose the schedule that works best for you.",
    },
    {
      icon: <Star />,
      heading: "Trusted",
      content:
        "Read reviews and ratings. Make informed decisions based on real experiences.",
    },
  ];

  return (
    <>
      <HomePageHeader />
      <HomePageFeatures
        heading="How It Works"
        content="Getting started with RideShare is easy. Just follow these three simple steps."
        cards={howItWorksCards}
      />
      <HomePageFeatures
        heading="Why Choose RideShare?"
        content="More than just a ride - it's a smarter way to travel."
        cards={featuresCards}
      />
    </>
  );
}

export default HomePage;
