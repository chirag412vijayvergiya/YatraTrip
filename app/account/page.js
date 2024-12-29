import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Guest Area",
  description: "Account Page",
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  console.log(session);

  const firstName = session?.user?.name?.split(" ").at(0);

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {firstName}
    </h2>
  );
}
