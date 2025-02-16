import { Josefin_Sans } from "next/font/google";
import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";
import Footer from "./_components/Footer";
import Chatbot from "./_components/Chatbot";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | The YatraTrip",
    default: "Welcome | The YatraTrip",
  },
  description: "The YatraTrip - A place to relax and enjoy nature",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 flex flex-col`}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid">
            <main className="max-w-7xl mx-auto w-full">
              <ReservationProvider>{children}</ReservationProvider>
            </main>
          </div>
        </div>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
