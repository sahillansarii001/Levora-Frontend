import DynamicRenderer from '@/components/DynamicRenderer';
import { generateBreadcrumbSchema } from '@/lib/structuredData';

export const metadata = {
  title: "Study Materials | Levora Self Notes System — Levora Academy",
  description: "Access Levora Academy's proprietary study materials — chapterwise notes, PYQs, formula sheets, handwritten toppers' notes, and coding cheat sheets. Free for enrolled students.",
  alternates: {
    canonical: 'https://levoraacademy.vercel.app/study-materials',
  },
  openGraph: {
    title: "Study Materials | Levora Self Notes System — Levora Academy",
    description: "Access Levora Academy's proprietary study materials — chapterwise notes, PYQs, formula sheets, handwritten toppers' notes, and coding cheat sheets. Free for enrolled students.",
    url: 'https://levoraacademy.vercel.app/study-materials',
    images: [{ url: 'https://levoraacademy.vercel.app/api/og', width: 1200, height: 630 }],
  }
};

export default async function StudyMaterialsPage() {
  let content = {};
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/cms/content?page=study-materials`, { 
      next: { revalidate: 0 } 
    });
    const data = await res.json();
    if (data.success) content = data.data;
  } catch (error) {
    console.error('Failed to fetch study materials page content', error);
  }

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema('Study Materials', 'https://levoraacademy.vercel.app/study-materials')) }}
      />
      <DynamicRenderer content={content} pageName="study-materials" />
    </div>
  );
}
