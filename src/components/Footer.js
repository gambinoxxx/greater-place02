"use client";

import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = (id) => {
    if (pathname !== '/') {
      router.push('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 500);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="border-t border-neutral-200 dark:border-gray-700 mt-8 px-5 md:px-16 py-5 md:py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Link href={"/"} className="text-3xl">
              <span className="text-purple-600">Greater</span> Place.
            </Link>
            <p className="max-w-xs mt-4 text-sm dark:text-gray-300">
              Creating a sacred space where people of all ages can embrace their God-given creative gifts through dance.
            </p>
            <div className="flex mt-8 space-x-6">
              <Link
                href="https://www.instagram.com/reel/DI23Np5t2n1/?igsh=Nm5nbjVhbWt3aWF5"
                target="_blank"
              >
                <InstagramIcon className="hover:text-purple-600 hover:-translate-y-1 transition-all" />
              </Link>
              <Link
                href="https://youtube.com/@greaterplacenonprofit?si=JU5hHLMOAUOmBSAF"
                target="_blank"
              >
                <YouTubeIcon className="hover:text-purple-600 hover:-translate-y-1 transition-all" />
              </Link>
            </div>
          </div>

          <div className="grid gap-8 lg:col-span-2 grid-cols-1 md:grid-cols-2">
            <div>
              <p className="font-medium dark:text-white">Navigation</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm dark:text-gray-300">
                <button
                  onClick={() => scrollToSection('header')}
                  className="hover:opacity-75 hover:border-b hover:border-neutral-400 w-fit text-left"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('donate')}
                  className="hover:opacity-75 hover:border-b hover:border-neutral-400 w-fit text-left"
                >
                  Donation
                </button>
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="hover:opacity-75 hover:border-b hover:border-neutral-400 w-fit text-left"
                >
                  Gallery
                </button>
                <button
                  onClick={() => scrollToSection('events')}
                  className="hover:opacity-75 hover:border-b hover:border-neutral-400 w-fit text-left"
                >
                  Booking & Calendar
                </button>
                <button
                  onClick={() => scrollToSection('features')}
                  className="hover:opacity-75 hover:border-b hover:border-neutral-400 w-fit text-left"
                >
                  About Us
                </button>
              </nav>
            </div>
            <div>
              <p className="font-medium dark:text-white">Get in Touch</p>
              <div className="flex flex-col mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <p>10609 Veterans Memorial Hwy</p>
                <p>Lithia Springs, GA 30122</p>
                <p>United States</p>
                <p>
                  Phone: <a href="tel:7704301708" className="hover:text-purple-600">(770) 430-1708</a>
                </p>
                <p>Fax: (770) 430-1708</p>
                <p>
                  Email: <a href="mailto:info@mysite.com" className="hover:text-purple-600">greaterplace@greaterplacenon-profit.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs dark:text-gray-400">Copyright &copy; Greater Place Non Profit Inc. 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
