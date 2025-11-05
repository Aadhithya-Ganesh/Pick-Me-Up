import DriverPage from "./DriverPage";
import RiderPage from "./RiderPage";

function HomePage() {
  const mode = "D";

  return <div>{mode === "D" ? <DriverPage /> : <RiderPage />}</div>;
}

export default HomePage;
