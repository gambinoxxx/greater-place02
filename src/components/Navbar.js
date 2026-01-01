"use client";

import { auth } from "../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState("/");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const navbar = useRef();
  const router = useRouter();

  const navLinks = [
    { name: "home", id: "home" },
    { name: "about", id: "about" },
    { name: "gallery", id: "gallery" },
    { name: "events", id: "events" },
    { name: "team", id: "team" },
    { name: "testimonial", id: "testimonials" },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  useEffect(() => {
    window.onscroll = () => {
      setMounted(true);
      if (window.pageYOffset >= 200) {
        navbar.current.classList.add("shadow");
      } else {
        navbar.current.classList.remove("shadow");
      }
    };
  }, []);

  return (
    <div
      ref={navbar}
      className={`${
        theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-black"
      } w-full z-50 fixed top-0 left-0 py-4 mb-10`}
    >
      <div className="container px-5 md:px-16 flex items-center justify-between mx-auto">
        <Link href={"/"}>
          <h2 className="text-3xl">
            <span className="text-blue-600">G</span>reater <span className="text-blue-600">P</span>lace.
          </h2>
        </Link>

        <div>
          <ul
            className={`${toggleMenu === true ? "left-0" : "-left-full"} ${
              theme === "dark"
                ? "bg-[#121212] text-white"
                : "bg-white text-black"
            } z-50 flex md:items-center gap-1 md:gap-5 lg:gap-10 md:relative absolute top-0 md:left-0 w-80 transition-all duration-500 h-screen md:w-auto md:h-auto flex-col md:flex-row shadow-2xl py-24 px-10 md:p-0 md:shadow-none`}
          >
            <button
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } md:hidden absolute top-6 right-5`}
              onClick={() => setToggleMenu(false)}
            >
              <CloseOutlinedIcon />
            </button>
            {navLinks.map((item) => (
              <li
                key={item.name}
                className={`${
                  selectedItem === item.name ? "text-blue-600" : ""
                } capitalize border-b py-4 md:border-none md:py-0 hover:text-blue-600`}
                onClick={() => setSelectedItem(item.name)}
              >
                <Link href={`#${item.id}`}>{item.name}</Link>
              </li>
            ))}
            <div className="md:hidden mx-auto absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3">
              
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
          </ul>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 md:gap-2 lg:gap-4">
          {user ? (
            <div className="flex items-center gap-2">
              <Link href="/admin">
                <button className="capitalize text-sm sm:text-base font-semibold sm:py-3 py-2 px-3 sm:px-6 text-white rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
                  Dashboard
                </button>
              </Link>
              <button onClick={handleLogout} className="text-sm font-semibold hover:text-red-500 transition-colors">Logout</button>
            </div>
          ) : (
            <Link href={"/login"}>
              <button className="capitalize text-sm sm:text-base font-semibold sm:py-3 py-2 px-3 sm:px-6 text-white rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
                Login
              </button>
            </Link>
          )}
          <button>
            {theme === "dark" ? (
              <LightModeRoundedIcon
                onClick={() => setTheme("light")}
                className="text-white"
              />
            ) : (
              <DarkModeOutlinedIcon onClick={() => setTheme("dark")} />
            )}
          </button>
          <button
            aria-label="menu"
            className={`${
              theme === "dark" ? "text-white" : "text-black"
            } md:hidden`}
            onClick={() => setToggleMenu(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
