import Image from "next/image";
import TextExpander from "./TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

// function Cabin({ cabin }) {
//   const { id, name, maxCapacity, regularPrice, discount, image, description } =
//     cabin;
//   return (
//     <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
//       <div className="relative scale-[1.15] -translate-x-3">
//         <Image
//           src={`/${image}`}
//           fill
//           className="object-cover border-r border-primary-800"
//           alt={`Cabin ${name}`}
//         />
//       </div>

//       <div>
//         <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
//           Cabin {name}
//         </h3>

//         <p className="text-lg text-primary-300 mb-10">
//           <TextExpander>{description}</TextExpander>
//         </p>

//         <ul className="flex flex-col gap-4 mb-7">
//           <li className="flex gap-3 items-center">
//             <UsersIcon className="h-5 w-5 text-primary-600" />
//             <span className="text-lg">
//               For up to <span className="font-bold">{maxCapacity}</span> guests
//             </span>
//           </li>
//           <li className="flex gap-3 items-center">
//             <MapPinIcon className="h-5 w-5 text-primary-600" />
//             <span className="text-lg">
//               Located in the heart of the{" "}
//               <span className="font-bold">Dolomites</span> (Italy)
//             </span>
//           </li>
//           <li className="flex gap-3 items-center">
//             <EyeSlashIcon className="h-5 w-5 text-primary-600" />
//             <span className="text-lg">
//               Privacy <span className="font-bold">100%</span> guaranteed
//             </span>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Cabin;

function Cabin({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-6 md:gap-20 border border-primary-800 py-3 px-6 md:px-10 mb-10 md:mb-24">
      {/* Image Container */}
      <div className="relative md:scale-[1.15] h-64 md:h-full scale-100 w-full translate-x-0 overflow-hidden">
        <Image
          src={`/${image}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover  border-r border-primary-800"
          alt={`Cabin ${name}`}
        />
      </div>

      {/* Content Container */}
      <div>
        {/* Title */}
        <h3 className="text-accent-100 font-black text-4xl md:text-7xl mb-3 md:mb-5 translate-x-0 md:translate-x-[-254px] bg-primary-950 p-4 md:p-6 pb-1 w-full md:w-[150%]">
          Cabin {name}
        </h3>

        {/* Description */}
        <p className="text-base md:text-lg text-primary-300 mb-6 md:mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        {/* Features List */}
        <ul className="flex flex-col gap-3 md:gap-4 mb-5 md:mb-7">
          <li className="flex gap-2 md:gap-3 items-center">
            <UsersIcon className="h-4 md:h-5 w-4 md:w-5 text-primary-600" />
            <span className="text-sm md:text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-2 md:gap-3 items-center">
            <MapPinIcon className="h-4 md:h-5 w-4 md:w-5 text-primary-600" />
            <span className="text-sm md:text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-2 md:gap-3 items-center">
            <EyeSlashIcon className="h-4 md:h-5 w-4 md:w-5 text-primary-600" />
            <span className="text-sm md:text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Cabin;
