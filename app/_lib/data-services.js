import { executeQuery } from "./db";

export async function createGuest(newGuest) {
  const { email, fullName } = newGuest;

  try {
    // Insert data into the users table

    console.log("//////////////////////", newGuest);
    const result = await executeQuery(
      "INSERT INTO users (email, fullName) VALUES (?, ?)",
      [email, fullName]
    );

    console.log("User Created:", result);

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
    console.log("//////////////////////", email);

    const [guest] = await executeQuery("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    console.log("Guest fetched:", guest);
    return guest;
  } catch (error) {
    console.error("Error fetching guest:", error.message);
    throw new Error("Guest could not be fetched.");
  }
}
