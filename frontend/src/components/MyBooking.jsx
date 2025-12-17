function MyBooking() {
  return (
    <div className="m-8">
      <p className="text-2xl font-bold">My Booking</p>
    </div>
  );
}

export default MyBooking;

export async function loader() {
  console.log("booking Loader");
}
