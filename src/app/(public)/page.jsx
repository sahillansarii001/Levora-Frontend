import DynamicRenderer from '@/components/DynamicRenderer';
import SeoContentBlock from '@/components/home/SeoContentBlock';
import { generateEducationalOrganizationSchema } from '@/lib/structuredData';

export const metadata = {
  title: "Levora Academy | Best Coaching Institute for JEE, NEET & School in India",
  description: "Levora Academy offers expert coaching for JEE, NEET, Class 6–12, Coding, and Spoken English. Trusted by students, 99% board success rate. Admissions open for 2025–26.",
  keywords: ["JEE coaching India", "NEET preparation academy", "Class 10 tuition", "best coaching institute India", "online education India", "school tuition Mumbai"],
  alternates: {
    canonical: 'https://levoraacademy.vercel.app',
  },
  openGraph: {
    title: "Levora Academy | Best Coaching Institute for JEE, NEET & School in India",
    description: "Levora Academy offers expert coaching for JEE, NEET, Class 6–12, Coding, and Spoken English. Trusted by students, 99% board success rate. Admissions open for 2025–26.",
    url: 'https://levoraacademy.vercel.app',
    images: [{ url: 'https://levoraacademy.vercel.app/api/og', width: 1200, height: 630 }],
  },
  twitter: {
    title: "Levora Academy | Best Coaching Institute for JEE, NEET & School in India",
    description: "Levora Academy offers expert coaching for JEE, NEET, Class 6–12, Coding, and Spoken English. Trusted by students, 99% board success rate. Admissions open for 2025–26.",
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
      next: { revalidate: 0 }, // Disable cache so it updates instantly
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
      <DynamicRenderer content={content} pageName="homepage" />
    </>
  );
}

// touch
