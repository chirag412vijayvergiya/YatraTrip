import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfile from "@/app/_components/UpdateProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getGuest } from "@/app/_lib/data-services";
export const metadata = {
  title: "Update Profile",
  description: "Update your guest profile",
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  const guest = await getGuest(session.user.email);

  return (
    <div>
      <h2 className="font-semibold text-xl md:text-3xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-sm md:text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfile guest={guest}>
        {/* We are passing server component as a prop in client component */}
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={guest.nationality}
        />
      </UpdateProfile>
    </div>
  );
}
