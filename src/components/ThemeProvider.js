"use client";

import { ThemeProvider as Theme } from "next-themes";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollTop from "./ScrollTop";
import TextGlowEffect from "./TextGlowEffect";
import NextNProgress from "nextjs-progressbar";

const ThemeProvider = ({ children }) => {
  return (
    <Theme attribute={"class"} enableSystem={false}>
      <NextNProgress
        color="#e11d48"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
        options={{ easing: "ease-in-out", speed: 500 }}
      />
      <Navbar />
      <TextGlowEffect />
      {children}
      <ScrollTop />
      <Footer />
    </Theme>
  );
};

export default ThemeProvider;
