import DynamicRenderer from '@/components/DynamicRenderer';
import { generateEducationalOrganizationSchema, generateBreadcrumbSchema } from '@/lib/structuredData';

export const metadata = {
  title: "About Us | Levora Academy — Our Mission, Vision & Leadership",
  description: "Learn about Levora Academy's mission to deliver world-class education in India. Meet our founder Dr. Vikram Singhania and discover what drives our 99% success rate.",
  alternates: {
    canonical: 'https://levoraacademy.vercel.app/about',
  },
  openGraph: {
    title: "About Us | Levora Academy — Our Mission, Vision & Leadership",
    description: "Learn about Levora Academy's mission to deliver world-class education in India. Meet our founder Dr. Vikram Singhania and discover what drives our 99% success rate.",
    url: 'https://levoraacademy.vercel.app/about',
    images: [{ url: 'https://levoraacademy.vercel.app/api/og', width: 1200, height: 630 }],
  },
  twitter: {
    title: "About Us | Levora Academy — Our Mission, Vision & Leadership",
    description: "Learn about Levora Academy's mission to deliver world-class education in India. Meet our founder Dr. Vikram Singhania and discover what drives our 99% success rate.",
    images: ['https://levoraacademy.vercel.app/api/og'],
  }
};

export default async function AboutPage() {
  let content = {};
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/cms/content?page=about`, { 
      next: { revalidate: 0 } 
    });
    const data = await res.json();
    if (data.success) content = data.data;
  } catch (error) {
    console.error('Failed to fetch about content', error);
  }

  return (
    <div className="bg-white min-h-screen pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateEducationalOrganizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", 
          "@type": "BreadcrumbList", 
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://levoraacademy.vercel.app" },
            { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://levoraacademy.vercel.app/about" }
          ]
        }) }}
      />
      <DynamicRenderer content={content} pageName="about" />
    </div>
  );
}
