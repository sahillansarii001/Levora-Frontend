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
  }
};

const coursesList = [
  { name: "School Foundation (Class 6-10)", desc: "Build a strong academic foundation." },
  { name: "JEE Preparation", desc: "Expert coaching for IIT-JEE engineering entrance." },
  { name: "NEET Preparation", desc: "Top-tier coaching for medical entrance." },
  { name: "Pre-Primary", desc: "Early learning and development." },
  { name: "Python Programming", desc: "Learn to code in Python." },
  { name: "Web Development", desc: "Full-stack web development training." },
  { name: "Spoken English", desc: "Improve communication skills." },
  { name: "Skill Development", desc: "Various 21st-century skills." }
];

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

  const courseSchemas = coursesList.map(c => generateCourseSchema(c.name, c.desc));

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchemas) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema('Courses', 'https://levoraacademy.vercel.app/courses')) }}
      />
      <DynamicRenderer content={content} pageName="courses" />
    </div>
  );
}
