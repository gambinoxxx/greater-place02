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
  const [selectedItem, setSelectedItem] = useState("home");
  const [hoveredItem, setHoveredItem] = useState(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const navbar = useRef(null);
  const router = useRouter();

  const navLinks = [
    { name: "home", id: "home", color: "#4F46E5", image: "/homi.png" },
    { name: "about", id: "about", color: "#7C3AED", image: "/about.png" },
    { name: "gallery", id: "gallery", color: "#DB2777", image: "/gallero.png" },
    { name: "events", id: "events", color: "#DC2626", image: "/event.png" },
    { name: "team", id: "team", color: "#EA580C", image: "/Team.png" },
    { name: "testimonial", id: "testimonials", color: "#059669", image: "/testimony.png" },
  ];

  /* ================= AUTH ================= */
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

  /* ================= SHADOW ON SCROLL ================= */
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        navbar.current?.classList.add("shadow-xl");
      } else {
        navbar.current?.classList.remove("shadow-xl");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= LOCK BODY SCROLL ================= */
  useEffect(() => {
    document.body.style.overflow = toggleMenu ? "hidden" : "auto";
  }, [toggleMenu]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <div
        ref={navbar}
        className="bg-black text-white fixed w-full top-0 left-0 z-50 py-4 transition-shadow duration-300"
      >
        <div className="container mx-auto px-5 md:px-16 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/">
            <h2 className="text-3xl font-bold cursor-pointer">
              <span className="text-blue-500">G</span>reater{" "}
              <span className="text-blue-500">P</span>lace.
            </h2>
          </Link>

          {/* ================= MENU ================= */}
          <ul
            className={`${toggleMenu ? "left-0" : "-left-full"} 
            bg-black text-white
            md:relative absolute top-0 md:left-0 w-80 md:w-auto h-screen md:h-auto 
            flex flex-col md:flex-row gap-3 md:gap-6 
            py-24 px-10 md:p-0 
            shadow-2xl md:shadow-none 
            transition-all duration-500 z-50`}
          >
            {/* CLOSE BUTTON */}
            <button
              className="md:hidden absolute top-6 right-6 text-white"
              onClick={() => setToggleMenu(false)}
            >
              <CloseOutlinedIcon />
            </button>

            {navLinks.map((item) => (
              <li
                key={item.name}
                className="relative group"
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => {
                  setSelectedItem(item.name);
                  setToggleMenu(false);
                }}
              >
                <Link href={`#${item.id}`}>
                  <div
                    className="capitalize py-3 px-4 md:py-2 md:px-3 rounded-lg transition-all duration-300 hover:scale-105 font-medium"
                    style={{
                      backgroundColor:
                        selectedItem === item.name
                          ? item.color
                          : hoveredItem?.name === item.name
                          ? `${item.color}20`
                          : "transparent",
                      color:
                        selectedItem === item.name
                          ? "#ffffff"
                          : hoveredItem?.name === item.name
                          ? item.color
                          : "#ffffff", // DEFAULT WHITE
                    }}
                  >
                    {item.name}
                  </div>
                </Link>

                {/* DESKTOP UNDERLINE */}
                <div
                  className="hidden md:block absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ backgroundColor: item.color }}
                />
              </li>
            ))}

            {/* SOCIAL ICONS MOBILE */}
            <div className="md:hidden absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-4 text-white">
              <InstagramIcon />
              <YouTubeIcon />
            </div>
          </ul>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex items-center gap-4 text-white">

            {user ? (
              <>
                <Link href="/admin">
                  <button className="px-6 py-2 text-white rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 transition shadow-md">
                    Dashboard
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="font-medium hover:text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <button className="px-6 py-2 text-white rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 transition shadow-md">
                  Login
                </button>
              </Link>
            )}

            {/* THEME TOGGLE (still works but won't change navbar color) */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover:rotate-180 transition-transform duration-500"
              >
                {theme === "dark" ? (
                  <LightModeRoundedIcon className="text-white" />
                ) : (
                  <DarkModeOutlinedIcon className="text-white" />
                )}
              </button>
            )}

            {/* HAMBURGER */}
            <button
              className="md:hidden hover:scale-110 transition-transform text-white"
              onClick={() => setToggleMenu(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {/* ================= DROPDOWN IMAGE ================= */}
        {hoveredItem && (
          <div
            className="hidden md:block absolute left-0 top-full w-full h-[350px]"
            style={{
              backgroundImage: `url(${hoveredItem.image})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: "#000",
            }}
          >
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: `${hoveredItem.color}AA` }}
            >
              <h2 className="text-5xl font-bold text-white capitalize">
                {hoveredItem.name}
              </h2>
            </div>
          </div>
        )}
      </div>

      <div className="h-[90px]" />
    </>
  );
};

export default Navbar;
