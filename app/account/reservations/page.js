import ReservationList from "@/app/_components/ReservationList";
import { getServerSession } from "next-auth";
import { authOptions } from "./../../api/auth/[...nextauth]/route";
import { getBookings } from "@/app/_lib/data-services";
import Link from "next/link";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  // console.log("From Reservation :- ", session);

  const bookings = await getBookings(session.user.guestId);

  // console.log(bookings);

  return (
    <div>
      <h2 className="font-semibold text-xl md:text-3xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-sm">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
