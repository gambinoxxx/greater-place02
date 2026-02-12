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
  const [hoveredItem, setHoveredItem] = useState(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const navbar = useRef();
  const router = useRouter();

  const navLinks = [
    { name: "home", id: "home", color: "#4F46E5" }, // Indigo
    { name: "about", id: "about", color: "#7C3AED" }, // Purple
    { name: "gallery", id: "gallery", color: "#DB2777" }, // Pink
    { name: "events", id: "events", color: "#DC2626" }, // Red
    { name: "team", id: "team", color: "#EA580C" }, // Orange
    { name: "testimonial", id: "testimonials", color: "#059669" }, // Emerald
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    setMounted(true);
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset >= 200) {
        navbar.current.classList.add("shadow-lg");
      } else {
        navbar.current.classList.remove("shadow-lg");
      }
    };
  }, []);

  return (
    <div
      ref={navbar}
      className={`${
        theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-black"
      } w-full z-50 fixed top-0 left-0 py-4 mb-10 transition-shadow duration-300`}
    >
      <div className="container px-5 md:px-16 flex items-center justify-between mx-auto">
        <Link href={"/"}>
          <h2 className="text-3xl font-bold">
            <span className="text-blue-600">G</span>reater{" "}
            <span className="text-blue-600">P</span>lace.
          </h2>
        </Link>

        <div>
          <ul
            className={`${toggleMenu === true ? "left-0" : "-left-full"} ${
              theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-black"
            } z-50 flex md:items-center gap-1 md:gap-3 lg:gap-6 md:relative absolute top-0 md:left-0 w-80 transition-all duration-500 h-screen md:w-auto md:h-auto flex-col md:flex-row shadow-2xl py-24 px-10 md:p-0 md:shadow-none`}
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
                className="relative group"
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => {
                  setSelectedItem(item.name);
                  setToggleMenu(false);
                }}
              >
                <Link href={`#${item.id}`}>
                  <div
                    className={`
                      capitalize 
                      py-3 px-4 md:py-2 md:px-3
                      rounded-lg
                      transition-all duration-300
                      hover:scale-105
                      ${
                        selectedItem === item.name
                          ? "font-semibold shadow-md"
                          : "font-medium"
                      }
                    `}
                    style={{
                      backgroundColor:
                        selectedItem === item.name
                          ? item.color
                          : hoveredItem === item.name
                          ? `${item.color}20`
                          : "transparent",
                      color:
                        selectedItem === item.name
                          ? "#ffffff"
                          : hoveredItem === item.name
                          ? item.color
                          : theme === "dark"
                          ? "#ffffff"
                          : "#1f2937",
                    }}
                  >
                    {item.name}
                  </div>
                </Link>
                
                {/* Bottom color indicator for desktop */}
                <div
                  className="hidden md:block absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ backgroundColor: item.color }}
                />
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
              <button
                onClick={handleLogout}
                className="text-sm font-semibold hover:text-red-500 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href={"/login"}>
              <button className="capitalize text-sm sm:text-base font-semibold sm:py-3 py-2 px-3 sm:px-6 text-white rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
                Login
              </button>
            </Link>
          )}
          <button>
            {mounted && theme === "dark" ? (
              <LightModeRoundedIcon
                onClick={() => setTheme("light")}
                className="text-white hover:rotate-180 transition-transform duration-500"
              />
            ) : (
              <DarkModeOutlinedIcon 
                onClick={() => setTheme("dark")} 
                className="hover:rotate-180 transition-transform duration-500"
              />
            )}
          </button>
          <button
            aria-label="menu"
            className={`${
              theme === "dark" ? "text-white" : "text-black"
            } md:hidden hover:scale-110 transition-transform`}
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
