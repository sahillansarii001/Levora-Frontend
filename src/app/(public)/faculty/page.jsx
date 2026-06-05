import DynamicRenderer from '@/components/DynamicRenderer';
import { generateBreadcrumbSchema } from '@/lib/structuredData';

export const metadata = {
  title: "Expert Faculty | Levora Academy — IIT & NEET Specialist Teachers",
  description: "Meet Levora Academy's faculty — IIT JEE experts, NEET ranker-makers, Olympiad mentors, and industry-certified tech educators with 8–15+ years of experience.",
  alternates: {
    canonical: 'https://levoraacademy.vercel.app/faculty',
  },
  openGraph: {
    title: "Expert Faculty | Levora Academy — IIT & NEET Specialist Teachers",
    description: "Meet Levora Academy's faculty — IIT JEE experts, NEET ranker-makers, Olympiad mentors, and industry-certified tech educators with 8–15+ years of experience.",
    url: 'https://levoraacademy.vercel.app/faculty',
    images: [{ url: 'https://levoraacademy.vercel.app/api/og', width: 1200, height: 630 }],
  }
};

export default async function FacultyPage() {
  let content = {};
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/cms/content?page=faculty`, { 
      next: { revalidate: 0 } 
    });
    const data = await res.json();
    if (data.success) content = data.data;
  } catch (error) {
    console.error('Failed to fetch faculty page content', error);
  }

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema('Expert Faculty', 'https://levoraacademy.vercel.app/faculty')) }}
      />
      <DynamicRenderer content={content} pageName="faculty" />
    </div>
  );
}
