import Image from "next/image";
import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";
import { getCabins } from "../_lib/data-services";
import Link from "next/link";

// export const revalidate = 24 * 60 * 60;

export const metadata = {
  title: "About",
  description: "About The YatraTrip",
};

// export default async function Page() {
//   const cabins = await getCabins();

//   return (
//     // <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
//     <div className="grid grid-cols-1 md:grid-cols-5 gap-x-6 gap-y-16 md:gap-x-24 md:gap-y-32 text-lg items-center px-6 md:px-12 lg:px-18">
//       {/* <div className="col-span-3"> */}
//       <div className="col-span-1 md:col-span-3">
//         <h1 className="text-3xl md:text-4xl mb-6 md:mb-10 text-accent-400 font-medium">
//           Welcome to The YatraTrip
//         </h1>

//         <div className="space-y-6 md:space-y-8">
//           <p>
//             Where nature&apos;s beauty and comfortable living blend seamlessly.
//             Hidden away in the heart of the Italian Dolomites, this is your
//             paradise away from home. But it&apos;s not just about the luxury
//             cabins. It&apos;s about the experience of reconnecting with nature
//             and enjoying simple pleasures with family.
//           </p>
//           <p>
//             Our {cabins.length} luxury cabins provide a cozy base, but the real
//             freedom and peace you&apos;ll find in the surrounding mountains.
//             Wander through lush forests, breathe in the fresh air, and watch the
//             stars twinkle above from the warmth of a campfire or your hot tub.
//           </p>
//           <p>
//             This is where memorable moments are made, surrounded by
//             nature&apos;s splendor. It&apos;s a place to slow down, relax, and
//             feel the joy of being together in a beautiful setting.
//           </p>
//         </div>
//       </div>

//       <div className="col-span-1 md:col-span-2">
//         <Image
//           src={image1}
//           alt="Family sitting around a fire pit in front of cabin"
//           placeholder="blur"
//           className="w-full h-auto rounded-lg"
//         />
//       </div>

//       <div className="relative col-span-1 md:col-span-2 aspect-square">
//         <Image
//           src={image2}
//           alt="Family that manages The YatraTrip"
//           fill
//           className="object-cover rounded-lg"
//         />
//       </div>

//       <div className="col-span-3">
//         <h1 className="text-4xl mb-10 text-accent-400 font-medium">
//           Managed by our family since 1962
//         </h1>

//         <div className="space-y-8">
//           <p>
//             Since 1962, The YatraTrip has been a cherished family-run retreat.
//             Started by our grandparents, this haven has been nurtured with love
//             and care, passing down through our family as a testament to our
//             dedication to creating a warm, welcoming environment.
//           </p>
//           <p>
//             Over the years, we&apos;ve maintained the essence of The YatraTrip,
//             blending the timeless beauty of the mountains with the personal
//             touch only a family business can offer. Here, you&apos;re not just a
//             guest; you&apos;re part of our extended family. So join us at The
//             YatraTrip soon, where tradition meets tranquility, and every visit
//             is like coming home.
//           </p>
//         </div>
//       </div>
//       <div className="col-span-5 flex justify-center items-center">
//         <Link
//           href="/cabins"
//           className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
//         >
//           Explore our luxury cabins
//         </Link>
//       </div>
//     </div>
//   );
// }

export default async function Page() {
  const cabins = await getCabins();

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-x-6 gap-y-16 md:gap-x-24 md:gap-y-32 text-lg items-center px-6 md:px-12 lg:px-18">
      <div className="col-span-1 md:col-span-3">
        <h1 className="text-3xl md:text-4xl mb-6 md:mb-10 text-accent-400 font-medium">
          Welcome to The YatraTrip
        </h1>

        <div className="space-y-6 md:space-y-8">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <p>
            Our {cabins.length} luxury cabins provide a cozy base, but the real
            freedom and peace you&apos;ll find in the surrounding mountains.
            Wander through lush forests, breathe in the fresh air, and watch the
            stars twinkle above from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
      </div>

      <div className="col-span-1 md:col-span-2">
        <Image
          src={image1}
          alt="Family sitting around a fire pit in front of cabin"
          placeholder="blur"
          className="w-full h-auto rounded-lg"
        />
      </div>

      <div className="relative col-span-1 md:col-span-2 aspect-square hidden md:block">
        <Image
          src={image2}
          alt="Family that manages The YatraTrip"
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="col-span-1 md:col-span-3">
        <h1 className="text-3xl md:text-4xl mb-6 md:mb-10 text-accent-400 font-medium">
          Managed by our family since 1962
        </h1>

        <div className="space-y-6 md:space-y-8">
          <p>
            Since 1962, The YatraTrip has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The YatraTrip,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            YatraTrip soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>
        </div>
      </div>
      <div className="relative col-span-1 md:col-span-2 aspect-square md:hidden">
        <Image
          src={image2}
          alt="Family that manages The YatraTrip"
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="col-span-1 md:col-span-5 flex justify-center items-center">
        <Link
          href="/cabins"
          className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore our luxury cabins
        </Link>
      </div>
    </div>
  );
}
