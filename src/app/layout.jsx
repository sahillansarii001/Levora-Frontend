import { Poppins, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Chatbot from "@/components/shared/Chatbot";
import Script from "next/script";
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
  description: "Levora Academy provides structured learning, expert guidance, and premium resources to help students achieve academic excellence.",
  keywords: ["education", "academy", "learning", "courses", "student success", "online education"],
  authors: [{ name: 'Levora Academy' }],
  openGraph: {
    title: 'Levora Academy | Premium Education',
    description: 'Levora Academy provides structured learning, expert guidance, and premium resources to help students achieve academic excellence.',
    url: 'https://levoraacademy.vercel.app',
    siteName: 'Levora Academy',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Levora Academy | Premium Education',
    description: 'Levora Academy provides structured learning, expert guidance, and premium resources to help students achieve academic excellence.',
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
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-LEVORA12345`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LEVORA12345', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '999999999999999');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-slate-50 text-slate-800 overflow-x-clip">
        <Toaster position="top-right" />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
