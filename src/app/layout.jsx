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
  metadataBase: new URL('https://levoraacademy.vercel.app'),
  title: "Levora Academy | Premium Education",
  description: "Levora Academy empowers students with structured learning, expert guidance, and premium resources. Join our courses today to achieve academic excellence.",
  keywords: ["education", "academy", "learning", "courses", "student success", "online education"],
  authors: [{ name: 'Levora Academy' }],
  openGraph: {
    title: 'Levora Academy | Premium Education',
    description: 'Levora Academy empowers students with structured learning, expert guidance, and premium resources. Join our courses today to achieve academic excellence.',
    url: 'https://levoraacademy.vercel.app',
    siteName: 'Levora Academy',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Levora Academy | Premium Education',
    description: 'Levora Academy empowers students with structured learning, expert guidance, and premium resources. Join our courses today to achieve academic excellence.',
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-sans min-h-screen flex flex-col bg-slate-50 text-slate-800 overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
