import DynamicRenderer from '@/components/DynamicRenderer';
import { generateCourseSchema, generateBreadcrumbSchema } from '@/lib/structuredData';

export const metadata = {
  title: "Courses | JEE, NEET, School & Coding Programs — Levora Academy",
  description: "Explore Levora Academy's full course catalog — Pre-Primary to Class 12, JEE/NEET prep, Python, Web Development, Spoken English & more. Expert faculty, proven results.",
  alternates: {
    canonical: 'https://levoraacademy.vercel.app/courses',
  },
  openGraph: {
    title: "Courses | JEE, NEET, School & Coding Programs — Levora Academy",
    description: "Explore Levora Academy's full course catalog — Pre-Primary to Class 12, JEE/NEET prep, Python, Web Development, Spoken English & more. Expert faculty, proven results.",
    url: 'https://levoraacademy.vercel.app/courses',
    images: [{ url: 'https://levoraacademy.vercel.app/api/og', width: 1200, height: 630 }],
  },
  twitter: {
    title: "Courses | JEE, NEET, School & Coding Programs — Levora Academy",
    description: "Explore Levora Academy's full course catalog — Pre-Primary to Class 12, JEE/NEET prep, Python, Web Development, Spoken English & more. Expert faculty, proven results.",
    images: ['https://levoraacademy.vercel.app/api/og'],
  }
};

export default async function CoursesPage() {
  let content = {};
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/cms/content?page=courses`, { 
      next: { revalidate: 0 } 
    });
    const data = await res.json();
    if (data.success) content = data.data;
  } catch (error) {
    console.error('Failed to fetch courses page content', error);
  }

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", 
          "@type": "BreadcrumbList", 
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://levoraacademy.vercel.app" },
            { "@type": "ListItem", "position": 2, "name": "Courses", "item": "https://levoraacademy.vercel.app/courses" }
          ]
        }) }}
      />
      <DynamicRenderer content={content} pageName="courses" />
    </div>
  );
}
