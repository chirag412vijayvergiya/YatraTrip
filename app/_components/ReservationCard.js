import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking, onDelete }) {
  // console.log(booking);
  // const {
  //   id,
  //   userId,
  //   startDate = new Date(),
  //   endDate,
  //   numNights,
  //   totalPrice,
  //   numGuests,
  //   status,
  //   created_at,
  //   cabinName,
  //   cabinImage,
  // } = booking;
  const {
    id,
    userId,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at: rawCreatedAt,
    cabinName,
    cabinImage,
    startDate: rawStartDate,
    endDate: rawEndDate,
  } = booking;

  const startDate = new Date(rawStartDate).toISOString();
  const pstartDate = parseISO(rawStartDate);
  const endDate = new Date(rawEndDate).toISOString();
  const created_at = new Date(rawCreatedAt).toISOString();

  return (
    <div className="flex flex-col md:flex-row border border-primary-800">
      <div className="relative h-28 md:h-32 aspect-square">
        <Image
          src={`/${cabinImage}`}
          alt={`Cabin ${cabinName}`}
          className="object-cover border-r border-primary-800"
          fill={true}
          sizes="100%"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="flex-grow md:px-6 px-3 md:py-3 py-2 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="md:text-xl text-lg font-semibold">
            {numNights} nights in Cabin {cabinName}
          </h3>
          {isPast(pstartDate) ? (
            <span className="bg-yellow-800 text-yellow-200 md:h-7 h-5 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 md:h-7 h-5 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              upcoming
            </span>
          )}
        </div>

        <p className="text-sm md:text-lg text-primary-300">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex gap-5 mt-auto items-baseline flex-row">
          <p className="text-xl font-semibold text-accent-400">${totalPrice}</p>
          <div className="flex gap-2">
            <p className="text-primary-300">&bull;</p>
            <p className="text-sm md:text-lg text-primary-300">
              {numGuests} guest{numGuests > 1 && "s"}
            </p>
          </div>
          <p className="ml-auto hidden md:block text-[0.4rem] md:text-sm text-primary-400">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
        <p className="ml-auto text-[0.5rem] md:hidden block md:text-sm text-primary-400">
          Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
        </p>
      </div>

      <div className="flex flex-row md:flex-col border-t md:border-l border-primary-800 md:w-[100px] py-2 md:py-0">
        {!isPast(pstartDate) ? (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 md:border-b border-r border-primary-800 flex-grow md:px-3 px-6 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1 ">Edit</span>
            </Link>
            <DeleteReservation bookingId={id} onDelete={onDelete} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ReservationCard;
