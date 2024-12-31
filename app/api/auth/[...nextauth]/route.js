// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { createGuest, getGuest } from "@/app/_lib/data-services";

// // console.log("AUTH_GOOGLE_ID", process.env.AUTH_GOOGLE_ID);
// // console.log("AUTH_GOOGLE_SECRET", process.env.AUTH_GOOGLE_SECRET);

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET,
//     }),
//   ],

//   callbacks: {
//     async signIn({ user, account, profile }) {
//       try {
//         const existingGuest = await getGuest(user.email);

//         if (!existingGuest) {
//           // Create a new guest if not found
//           await createGuest({ email: user.email, fullName: user.name });
//         }
//         return true;
//       } catch (error) {
//         console.error("Error in signIn callback: ", error);
//         return false; // Sign-in failed
//       }
//     },

//     async redirect({ url, baseUrl }) {
//       // After successful login, redirect to the account page
//       return baseUrl + "/account"; // You can also customize this further
//     },

//     async session({ session, user }) {
//       try {
//         // Fetch the guest details associated with the user
//         const guest = await getGuest(session.user.email);

//         console.log("Hello from session callback", guest);

//         if (guest) {
//           session.user.guestId = guest.id; // Attach guestId to the session
//         }
//         console.log("Session callback:", session);
//         return session;
//       } catch (error) {
//         console.error("Error in session callback: ", error);
//         return session; // Continue session even if guest not found
//       }
//     },
//   },

//   pages: {
//     signIn: "/login", // Custom login page
//   },
// });

// export { handler as GET, handler as POST };

/*
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createGuest, getGuest } from "@/app/_lib/data-services";

export const authOptions = {
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
          await createGuest({ email: user.email, fullName: user.name });
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/account";
    },
    async session({ session }) {
      try {
        const guest = await getGuest(session.user.email);
        if (guest) {
          session.user.guestId = guest.id;
        }
        // console.log("Session callback:", session);
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
*/

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createGuest, getGuest } from "@/app/_lib/data-services";

export const authOptions = {
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
          await createGuest({ email: user.email, fullName: user.name });
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/account";
    },
    async session({ session }) {
      try {
        const guest = await getGuest(session.user.email);
        if (guest) {
          session.user.guestId = guest.id;
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

// Named exports for HTTP methods
export const GET = handler;
export const POST = handler;
