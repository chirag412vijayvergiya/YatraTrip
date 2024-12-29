// import { createGuest, getGuest } from "@/app/_lib/data-services";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET,
//     }),
//   ],

//   // Force Node.js runtime for this file
//   runtime: "nodejs",

//   callbacks: {
//     async signIn({ user, account, profile }) {
//       try {
//         const existingGuest = await getGuest(user.email);

//         if (!existingGuest)
//           await createGuest({ email: user.email, fullName: user.name });
//         return true;
//       } catch {
//         return false;
//       }
//     },

//     async redirect({ url, baseUrl }) {
//       // Redirect the user to the account page after successful sign-in
//       return baseUrl + "/account"; // Custom redirect to the account page
//     },

//     async session({ session, user }) {
//       console.log("session line 32 :- ", session);

//       const guest = await getGuest(session.user.email);

//       console.log("session line 34 :- ", guest);

//       session.user.guestId = guest.id;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
// });

// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createGuest, getGuest } from "@/app/_lib/data-services";

console.log("AUTH_GOOGLE_ID", process.env.AUTH_GOOGLE_ID);
console.log("AUTH_GOOGLE_SECRET", process.env.AUTH_GOOGLE_SECRET);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest) {
          // Create a new guest if not found
          await createGuest({ email: user.email, fullName: user.name });
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback: ", error);
        return false; // Sign-in failed
      }
    },

    async redirect({ url, baseUrl }) {
      // After successful login, redirect to the account page
      return baseUrl + "/account"; // You can also customize this further
    },

    async session({ session, user }) {
      try {
        // Fetch the guest details associated with the user
        const guest = await getGuest(session.user.email);
        if (guest) {
          session.user.guestId = guest.id; // Attach guestId to the session
        }
        return session;
      } catch (error) {
        console.error("Error in session callback: ", error);
        return session; // Continue session even if guest not found
      }
    },
  },

  pages: {
    signIn: "/login", // Custom login page
  },
});

export { handler as GET, handler as POST };
