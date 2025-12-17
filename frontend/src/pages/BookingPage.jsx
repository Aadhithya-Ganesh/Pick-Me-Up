import { Suspense, useState } from "react";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import BackdropLoader from "../utils/BackdropLoader";
import BookingPageContent from "../components/BookingPageContent";

function BookingPage() {
  const { ride } = useLoaderData();

  return (
    <Suspense fallback={<BackdropLoader />}>
      <Await resolve={ride}>
        {(ride) => <BookingPageContent ride={ride} />}
      </Await>
    </Suspense>
  );
}

export default BookingPage;
