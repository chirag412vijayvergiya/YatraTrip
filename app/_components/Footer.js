import Logo from "@/app/_components/Logo";
import Link from "next/link";
import { MdEmail, MdPhone } from "react-icons/md";

export const socialLinks = [
  {
    link: "https://chirag-vijay.vercel.app/",
    alt: "Portfolio",
  },
  {
    link: "https://github.com/chirag412vijayvergiya/",
    alt: "GitHub",
  },
  {
    link: "https://www.linkedin.com/in/chirag-vijayvergiya-548635245/",
    alt: "LinkedIn",
  },
];

function Footer() {
  return (
    <footer className="flex flex-col mx-auto w-full gap-y-7 py-6 border-primary-900  bg-primary-950 text-white">
      <div className="flex flex-col items-center gap-x-24 gap-y-12 md:flex-row md:items-start md:justify-around md:gap-0">
        {/* Left side: Logo */}
        <div className="flex flex-col items-center gap-y-3 px-4 text-center sm:items-start md:text-start z-10">
          <Logo />
        </div>

        {/* Middle side: Quick Links */}
        <div className="flex flex-col gap-y-3 text-center text-base md:text-left z-10">
          <h1 className="text-center font-semibold md:text-center text-xl text-accent-200">
            Quick Links
          </h1>
          <div className="flex flex-col gap-y-2">
            {socialLinks.map((social, index) => (
              <Link
                href={social.link}
                key={index}
                className="flex flex-row gap-x-2 items-center justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="text-shark-300 text-md font-normal hover:text-indigo-200 pt-1">
                  {social.alt}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Right side: Contact Info */}
        <div className="flex flex-col gap-y-3 text-center text-base md:text-left justify-center z-10">
          <p className="text-center font-medium text-xl md:text-center text-accent-200">
            Get In Touch
          </p>
          <div className="group flex flex-col items-center gap-3">
            <div className="flex flex-row gap-x-2 items-center hover:text-indigo-300">
              <MdEmail className="fill-shark-300 h-5 w-5" />
              <p className="text-shark-300 font-medium">chirag4vv@gmail.com</p>
            </div>
            <div className="flex flex-row gap-x-2 items-center hover:text-indigo-300">
              <MdPhone className="fill-shark-300 h-5 w-5 " />
              <p className="text-shark-300 font-medium tracking-wider">
                +91 7737012653
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-base text-accent-400 mx-4 md:mx-0 z-10">
        Copyright &copy; {new Date().getFullYear()} || Chirag Vijayvergiya All
        Right Reserved.
      </div>
    </footer>
  );
}

export default Footer;
