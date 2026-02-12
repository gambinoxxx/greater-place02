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

  // ✅ Correct image paths (NO "public/")
  const navLinks = [
    {
      name: "home",
      id: "home",
      color: "#4F46E5",
      image: "/home.png", // only if you have one
    },
    {
      name: "about",
      id: "about",
      color: "#7C3AED",
      image: "/about.png",
    },
    {
      name: "gallery",
      id: "gallery",
      color: "#DB2777",
      image: "/gallery.png",
    },
    {
      name: "events",
      id: "events",
      color: "#DC2626",
      image: "/event.png",
    },
    {
      name: "team",
      id: "team",
      color: "#EA580C",
      image: "/Team.png", // Case sensitive!
    },
    {
      name: "testimonial",
      id: "testimonials",
      color: "#059669",
      image: "/testimony.png",
    },
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
    const handleScroll = () => {
      if (window.pageYOffset >= 200) {
        navbar.current?.classList.add("shadow-lg");
      } else {
        navbar.current?.classList.remove("shadow-lg");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={navbar}
      className={`${
        theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-black"
      } w-full z-50 fixed top-0 left-0 py-4 transition-shadow duration-300 relative`}
    >
      <div className="container px-5 md:px-16 flex items-center justify-between mx-auto">
        <Link href={"/"}>
          <h2 className="text-3xl font-bold cursor-pointer">
            <span className="text-blue-600">G</span>reater{" "}
            <span className="text-blue-600">P</span>lace.
          </h2>
        </Link>

        <ul className="hidden md:flex items-center gap-6 relative">
          {navLinks.map((item) => (
            <li
              key={item.name}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative cursor-pointer"
            >
              <Link href={`#${item.id}`}>
                <span className="capitalize font-medium hover:scale-105 transition-all duration-300">
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/admin">
                <button className="text-sm font-semibold py-2 px-6 text-white rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 transition-all duration-300 shadow-md">
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
              <button className="text-sm font-semibold py-2 px-6 text-white rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 transition-all duration-300 shadow-md">
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
            className="md:hidden"
            onClick={() => setToggleMenu(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* ===== MEGA DROPDOWN ===== */}
      <div
        onMouseLeave={() => setHoveredItem(null)}
        className={`absolute left-0 top-full w-full overflow-hidden transition-all duration-500 ${
          hoveredItem ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {hoveredItem && (
          <div
            className="relative w-full h-[350px] flex items-center justify-center text-white"
            style={{ backgroundColor: hoveredItem.color }}
          >
            <img
              src={hoveredItem.image}
              alt={hoveredItem.name}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />

            <div className="relative z-10 text-center">
              <h2 className="text-5xl font-bold capitalize">
                {hoveredItem.name}
              </h2>
              <p className="mt-4 text-lg">
                Explore our {hoveredItem.name} section
              </p>
              <Link href={`#${hoveredItem.id}`}>
                <button className="mt-6 px-6 py-3 bg-white text-black rounded-full font-semibold hover:scale-105 transition-all duration-300">
                  View Section
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
