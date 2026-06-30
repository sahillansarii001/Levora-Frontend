import DynamicRenderer from '@/components/DynamicRenderer';
import { generateBreadcrumbSchema } from '@/lib/structuredData';
import { Lock, Sparkles, LogIn } from 'lucide-react';
import StudyMaterialsClient from './StudyMaterialsClient';

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
  },
  twitter: {
    title: "Study Materials | Levora Self Notes System — Levora Academy",
    description: "Access Levora Academy's proprietary study materials — chapterwise notes, PYQs, formula sheets, handwritten toppers' notes, and coding cheat sheets. Free for enrolled students.",
    images: ['https://levoraacademy.vercel.app/api/og'],
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
    <div className="bg-white h-screen relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", 
          "@type": "BreadcrumbList", 
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://levoraacademy.vercel.app" },
            { "@type": "ListItem", "position": 2, "name": "Study Materials", "item": "https://levoraacademy.vercel.app/study-materials" }
          ]
        }) }}
      />
      
      <StudyMaterialsClient content={content} />
    </div>
  );
}
