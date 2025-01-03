import { eachDayOfInterval } from "date-fns";
import { executeQuery } from "./db";

export async function createGuest(newGuest) {
  const { email, fullName } = newGuest;

  try {
    // Insert data into the users table

    // console.log("//////////////////////", newGuest);
    const result = await executeQuery(
      "INSERT INTO users (email, fullName) VALUES (?, ?)",
      [email, fullName]
    );

    // console.log("User Created:", result);

    // Return the ID of the newly created user
    return { success: true, insertId: result.insertId };
  } catch (error) {
    console.error("Error creating guest:", error.message);
    throw new Error("Guest could not be created.");
  }
}

export const config = {
  runtime: "nodejs", // Force Node.js runtime for this API
};

export async function getGuest(email) {
  try {
    // Fetch the user from the users table
    // console.log("//////////////////////", email);

    const [guest] = await executeQuery("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    // console.log("Guest fetched:", guest);
    return guest;
  } catch (error) {
    console.error("Error fetching guest:", error.message);
    throw new Error("Guest could not be fetched.");
  }
}
export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );

    const countries = await res.json();
    return countries;
  } catch (error) {
    console.error("Error fetching countries: ", error);
    throw new Error("Could not fetch countries");
  }
}

export async function getCabins() {
  const query = `
    SELECT id, name, maxCapacity, regularPrice, discount, image 
    FROM cabins 
    ORDER BY name;
  `;

  try {
    const data = await executeQuery(query);
    // console.log("Get Cabins :- ", data);
    return data; // Return the retrieved cabins data
  } catch (error) {
    console.error("Error loading cabins:", error.message);
    throw new Error("Cabins could not be loaded");
  }
}

export async function getCabin(id) {
  const query = `
    SELECT id, name, maxCapacity, regularPrice, discount, image, description 
    FROM cabins 
    WHERE id = ?;
  `;

  try {
    const [cabin] = await executeQuery(query, [id]);
    // console.log("Get Cabin :- ", cabin);

    return cabin;
  } catch (error) {
    console.error("Error loading cabin:", error.message);
    throw new Error("Cabin could not be loaded");
  }
}

export async function getBookedDatesByCabinId(cabinId) {
  const query = `
    SELECT startDate, endDate 
    FROM bookings 
    WHERE cabinId = ? 
    AND (startDate >= CURDATE() OR status = 'checked-in');
  `;

  try {
    const data = await executeQuery(query, [cabinId]);

    // console.log("Get Booked Dates By Cabin Id :- ", data);

    const bookedDates = data
      .map((booking) => {
        return eachDayOfInterval({
          start: new Date(booking.startDate),
          end: new Date(booking.endDate),
        });
      })
      .flat();

    return bookedDates;
  } catch (error) {
    console.error("Error fetching booked dates:", error.message);
    throw new Error("Booked dates could not be loaded");
  }
}

export async function getSettings() {
  const query = `
    SELECT * 
    FROM settings 
    LIMIT 1;
  `;

  try {
    const data = await executeQuery(query);

    if (data.length === 0) {
      throw new Error("No settings found");
    }

    return data[0];
  } catch (error) {
    console.error("Error fetching settings:", error.message);
    throw new Error("Settings could not be loaded");
  }
}

export async function getBookings(guestId) {
  // console.log("Guest ID :- ", guestId);

  const query = `
    SELECT 
      b.id, 
      b.created_at, 
      b.startDate, 
      b.endDate, 
      b.numNights, 
      b.numGuests, 
      b.totalPrice, 
      b.userId, 
      b.cabinId, 
      c.name AS cabinName, 
      c.image AS cabinImage
    FROM 
      bookings b
    LEFT JOIN 
      cabins c ON b.cabinId = c.id
    WHERE 
      b.userId = ?
    ORDER BY 
      b.startDate;
  `;
  try {
    const data = await executeQuery(query, [guestId]);
    // console.log("Get Bookings :- ", data);
    return data;
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    throw new Error("Bookings could not be loaded");
  }
}

export async function getBooking(bookingId) {
  const query = `
    SELECT 
      * FROM bookings WHERE id = ?;
  `;
  try {
    const [booking] = await executeQuery(query, [bookingId]);
    return booking;
  } catch (error) {
    console.error("Error fetching booking:", error.message);
    throw new Error("Booking could not be loaded");
  }
}
