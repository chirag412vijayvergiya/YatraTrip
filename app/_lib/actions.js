"use server";

export async function signInAction() {
  // Ensure we're on the client side
  console.log("signing in");
}

export async function signOutAction() {
  if (typeof window !== "undefined") {
    // Ensure we're on the client side
    await nextSignOut({ redirectTo: "/" });
  }
}
