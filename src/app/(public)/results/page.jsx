import DynamicRenderer from '@/components/DynamicRenderer';
import { generateBreadcrumbSchema } from '@/lib/structuredData';

export const metadata = {
  title: "Results & Achievements | IIT, NEET & Board Toppers — Levora Academy",
  description: "Levora Academy's legacy of excellence: 500+ IIT/NIT selections, 1000+ doctors produced, 95%+ board top scorers. View our 2024 results and success stories.",
  alternates: {
    canonical: 'https://levoraacademy.vercel.app/results',
  },
  openGraph: {
    title: "Results & Achievements | IIT, NEET & Board Toppers — Levora Academy",
    description: "Levora Academy's legacy of excellence: 500+ IIT/NIT selections, 1000+ doctors produced, 95%+ board top scorers. View our 2024 results and success stories.",
    url: 'https://levoraacademy.vercel.app/results',
    images: [{ url: 'https://levoraacademy.vercel.app/api/og', width: 1200, height: 630 }],
  }
};

export default async function ResultsPage() {
  let content = {};
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/cms/content?page=results`, { 
      next: { revalidate: 0 } 
    });
    const data = await res.json();
    if (data.success) content = data.data;
  } catch (error) {
    console.error('Failed to fetch results page content', error);
  }

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema('Results & Achievements', 'https://levoraacademy.vercel.app/results')) }}
      />
      <DynamicRenderer content={content} pageName="results" />
    </div>
  );
}
