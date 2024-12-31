import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-services";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
  const [settings, bookingDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const session = await getServerSession(authOptions);

  console.log(session);

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px] ">
      <DateSelector
        settings={settings}
        bookedDates={bookingDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session?.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
