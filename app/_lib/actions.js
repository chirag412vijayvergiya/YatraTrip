"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { executeQuery } from "./db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("You must be logged in");
  }

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please provide a valid nationalID");
  }

  try {
    const result = await executeQuery(
      `UPDATE users 
       SET nationality = ?, countryFlag = ?, nationalID = ?
       WHERE email = ?`,
      [nationality, countryFlag, nationalID, session.user.email]
    );

    console.log("Guest Updated:", result);

    if (result.affectedRows === 0) {
      throw new Error("No guest record found to update.");
    }

    revalidatePath("/account/profile");
    // return guest;
  } catch (err) {
    console.error("Error updating guest:", err.message);
    throw new Error("Guest could not be updated");
  }
}

export async function createBooking(bookingData, formData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("You must be logged in");
  }

  // console.log(session);

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000) || "",
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "pending",
  };

  // console.log("New Booking:", newBooking);

  const query = `
    INSERT INTO bookings (
      cabinId, userId, startDate, endDate, numNights, numGuests, cabinPrice, observations, 
      extrasPrice, totalPrice, isPaid, hasBreakfast, status
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const params = [
    bookingData.cabinId,
    newBooking.guestId,
    bookingData.startDate,
    bookingData.endDate,
    bookingData.numNights,
    newBooking.numGuests,
    bookingData.cabinPrice,
    newBooking.observations,
    newBooking.extrasPrice,
    newBooking.totalPrice,
    newBooking.isPaid,
    newBooking.hasBreakfast,
    newBooking.status,
  ];

  try {
    await executeQuery(query, params);

    revalidatePath(`/cabins/${bookingData.cabinId}`);

    redirect("/cabins/thankyou");
  } catch (error) {
    console.error("Error creating booking:", error.message);
    throw new Error("Booking could not be created");
  }
}
