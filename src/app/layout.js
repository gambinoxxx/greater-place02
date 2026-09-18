import "./globals.css";
import { Fraunces, Manrope } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Greater Place — Move. Grow. Lead.",
  description: "Greater Place — performing arts, ministry and youth development.",
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={fraunces.variable + " " + manrope.variable}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
