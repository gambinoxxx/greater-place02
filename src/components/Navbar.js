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
  const [hoveredItem, setHoveredItem] = useState(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const navbar = useRef(null);
  const router = useRouter();

  const navLinks = [
    { name: "about", id: "about", color: "#7C3AED", image: "/about.png" },
    { name: "gallery", id: "gallery", color: "#DB2777", image: "/gallery.png" },
    { name: "events", id: "events", color: "#DC2626", image: "/event.png" },
    { name: "team", id: "team", color: "#EA580C", image: "/Team.png" },
    { name: "testimonial", id: "testimonials", color: "#059669", image: "/testimony.png" },
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

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 50) {
        navbar.current?.classList.add("shadow-lg");
      } else {
        navbar.current?.classList.remove("shadow-lg");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (toggleMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [toggleMenu]);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <div
        ref={navbar}
        className={`${
          theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-black"
        } w-full fixed top-0 left-0 z-50 transition-shadow duration-300`}
      >
        <div className="container mx-auto px-5 md:px-16 py-4 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/">
            <h2 className="text-3xl font-bold cursor-pointer">
              <span className="text-blue-600">G</span>reater{" "}
              <span className="text-blue-600">P</span>lace.
            </h2>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <ul className="hidden md:flex gap-8">
            {navLinks.map((item) => (
              <li
                key={item.name}
                className="capitalize font-medium cursor-pointer hover:text-blue-600 transition"
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link href={`#${item.id}`}>{item.name}</Link>
              </li>
            ))}
          </ul>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {user ? (
              <>
                <Link href="/admin">
                  <button className="px-6 py-2 text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:scale-105 transition">
                    Dashboard
                  </button>
                </Link>
                <button onClick={handleLogout} className="hover:text-red-500">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <button className="px-6 py-2 text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:scale-105 transition">
                  Login
                </button>
              </Link>
            )}

            {/* THEME TOGGLE */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative z-[70]"
              >
                {theme === "dark" ? <LightModeRoundedIcon /> : <DarkModeOutlinedIcon />}
              </button>
            )}

            {/* HAMBURGER */}
            <button
              className="md:hidden relative z-[70]"
              onClick={() => setToggleMenu(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {/* ================= MEGA DROPDOWN (DESKTOP) ================= */}
        {hoveredItem && (
          <div
            className="hidden md:block absolute left-0 top-full w-full h-[400px] z-40 transition-all duration-300"
            style={{
              backgroundImage: `url(${hoveredItem.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Color Overlay */}
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: `${hoveredItem.color}CC` }}
            >
              <div className="text-center text-white">
                <h2 className="text-5xl font-bold capitalize">
                  {hoveredItem.name}
                </h2>
                <p className="mt-4 text-lg">
                  Explore our {hoveredItem.name} section
                </p>
                <Link href={`#${hoveredItem.id}`}>
                  <button className="mt-6 px-6 py-3 bg-white text-black rounded-full font-semibold hover:scale-105 transition">
                    View Section
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed top-0 left-0 h-screen w-80 bg-white dark:bg-[#121212] z-[60] transform ${
          toggleMenu ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <button
          className="absolute top-6 right-6"
          onClick={() => setToggleMenu(false)}
        >
          <CloseOutlinedIcon />
        </button>

        <ul className="mt-24 flex flex-col gap-6 px-8">
          {navLinks.map((item) => (
            <li
              key={item.name}
              className="capitalize font-medium"
              onClick={() => setToggleMenu(false)}
            >
              <Link href={`#${item.id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
          <InstagramIcon />
          <YouTubeIcon />
        </div>
      </div>

      {/* Spacer so content doesn't hide behind fixed navbar */}
      <div className="h-[80px]" />
    </>
  );
};

export default Navbar;
