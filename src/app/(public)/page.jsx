import DynamicRenderer from '@/components/DynamicRenderer';
import SeoContentBlock from '@/components/home/SeoContentBlock';
import { generateEducationalOrganizationSchema, generateLocalBusinessSchema } from '@/lib/structuredData';

export const metadata = {
  title: "Levora Academy | Top JEE & NEET Coaching Institute",
  description: "Levora Academy offers expert coaching for JEE, NEET, and Classes 6-12. Trusted by students with a 99% success rate. Admissions open for 2025-26!",
  keywords: ["JEE coaching India", "NEET preparation academy", "Class 10 tuition", "best coaching institute India", "online education India", "school tuition Mumbai"],
  alternates: {
    canonical: 'https://levoraacademy.vercel.app',
  },
  openGraph: {
    title: "Levora Academy | Top JEE & NEET Coaching Institute",
    description: "Levora Academy offers expert coaching for JEE, NEET, and Classes 6-12. Trusted by students with a 99% success rate. Admissions open for 2025-26!",
    url: 'https://levoraacademy.vercel.app',
    images: [{ url: 'https://levoraacademy.vercel.app/api/og', width: 1200, height: 630 }],
  },
  twitter: {
    title: "Levora Academy | Top JEE & NEET Coaching Institute",
    description: "Levora Academy offers expert coaching for JEE, NEET, and Classes 6-12. Trusted by students with a 99% success rate. Admissions open for 2025-26!",
    images: ['https://levoraacademy.vercel.app/api/og'],
  }
};

export default async function Home() {
  let content = {};
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

    // Fetch dynamic content for homepage
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/cms/content?page=homepage`, { 
      next: { revalidate: 60 }, // Cache for 60 seconds (ISR) to fix slow server response time
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    const data = await res.json();
    if (data.success) content = data.data;
  } catch (error) {
    console.error('Failed to fetch homepage content', error);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateEducationalOrganizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLocalBusinessSchema()) }}
      />
      <DynamicRenderer content={content} pageName="homepage" />
      <SeoContentBlock />
    </>
  );
}

// touch
