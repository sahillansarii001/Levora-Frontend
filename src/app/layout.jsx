import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
  variable: '--font-poppins'
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata = {
  title: "Levora Academy | Premium Education",
  description: "Empowering students through structured learning and expert guidance.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-sans min-h-screen flex flex-col bg-slate-50 text-slate-800">
        {children}
      </body>
    </html>
  );
}
