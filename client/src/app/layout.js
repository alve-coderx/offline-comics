import { Poppins, Jost, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AuthWrapper from "@/wrapper/AuthWrapper";
import TanstackWrapper from "@/wrapper/TanstackWrapper";

// Define the font subsets and weights for Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});
const siliguri = Hind_Siliguri({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-siliguri",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${siliguri.variable} font-poppins `}
      >
        <Toaster richColors />
        <TanstackWrapper>
          <AuthWrapper>{children}</AuthWrapper>
        </TanstackWrapper>
      </body>
    </html>
  );
}