"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();
  // CHANGE

  // const range = { from: null, to: null };
  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(displayRange.to, displayRange.from);
  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-10 md:pt-2 place-self-center pl-4 md:pl-0"
        mode="range"
        onSelect={setRange}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(currDate) =>
          isPast(currDate) ||
          bookedDates.some((date) => isSameDay(date, currDate))
        }
      />

      {/* <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline  md:gap-6 gap-2">
          <div>
            <p className="flex gap-2 items-baseline">
              {discount > 0 ? (
                <>
                  <span className="text-2xl">
                    &#8377;{regularPrice - discount}
                  </span>
                  <span className="line-through font-semibold text-primary-700">
                    &#8377;{regularPrice}
                  </span>
                </>
              ) : (
                <span className="text-2xl">${regularPrice}</span>
              )}
              <span className="">/night</span>
            </p>
          </div>
          {numNights ? (
            <>
              <p className="bg-accent-600 md:px-3 md:py-2 py-1 px-3 md:text-2xl text-xl ">
                <span>&times;</span> <span>{numNights}</span>
              </p>

              <p>
                <span className="md:text-lg text-base font-bold uppercase">
                  Total
                </span>{" "}
                <span className="text-2xl font-semibold">
                  &#8377;{cabinPrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div> */}
      <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 bg-accent-500 text-primary-800 h-auto md:h-[72px] py-4 md:py-0">
        <div className="flex flex-row items-center md:items-baseline gap-2 md:gap-6">
          <p className="flex gap-1 md:gap-2 items-baseline text-center md:text-left">
            {discount > 0 ? (
              <>
                <span className="text-xl md:text-2xl">
                  &#8377;{regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-700 text-sm md:text-base">
                  &#8377;{regularPrice}
                </span>
              </>
            ) : (
              <span className="text-xl md:text-2xl">&#8377;{regularPrice}</span>
            )}
            <span className="text-sm md:text-base">/night</span>
          </p>

          {numNights ? (
            <div className="flex items-center gap-2 md:gap-4">
              <p className="bg-accent-600 px-2 py-1 md:px-3 md:py-2 text-lg md:text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>

              <p>
                <span className="text-sm md:text-lg font-bold uppercase">
                  Total
                </span>{" "}
                <span className="text-xl md:text-2xl font-semibold">
                  &#8377;{cabinPrice}
                </span>
              </p>
            </div>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-1 px-3 md:py-2 md:px-4 text-xs md:text-sm font-semibold mt-2 md:mt-0"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
