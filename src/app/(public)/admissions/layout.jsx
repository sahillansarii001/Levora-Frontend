import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/structuredData';

export const metadata = {
  title: "Admissions 2025–26 | Apply Now — Levora Academy",
  description: "Apply for Levora Academy's 2025–26 batch. Admissions open for all programs — school foundation, JEE/NEET coaching, coding courses & skill development. Limited seats.",
  alternates: {
    canonical: 'https://levoraacademy.vercel.app/admissions',
  },
  openGraph: {
    title: "Admissions 2025–26 | Apply Now — Levora Academy",
    description: "Apply for Levora Academy's 2025–26 batch. Admissions open for all programs — school foundation, JEE/NEET coaching, coding courses & skill development. Limited seats.",
    url: 'https://levoraacademy.vercel.app/admissions',
    images: [{ url: 'https://levoraacademy.vercel.app/api/og', width: 1200, height: 630 }],
  },
  twitter: {
    title: "Admissions 2025–26 | Apply Now — Levora Academy",
    description: "Apply for Levora Academy's 2025–26 batch. Admissions open for all programs — school foundation, JEE/NEET coaching, coding courses & skill development. Limited seats.",
    images: ['https://levoraacademy.vercel.app/api/og'],
  }
};

export default function AdmissionsLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", 
          "@type": "BreadcrumbList", 
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://levoraacademy.vercel.app" },
            { "@type": "ListItem", "position": 2, "name": "Admissions", "item": "https://levoraacademy.vercel.app/admissions" }
          ]
        }) }}
      />
      {children}
    </>
  );
}
