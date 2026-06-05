import DynamicRenderer from '@/components/DynamicRenderer';
import { generateBreadcrumbSchema } from '@/lib/structuredData';

export const metadata = {
  title: "Contact Us | Levora Academy — Get in Touch",
  description: "Reach out to Levora Academy for admissions queries, course information, or support. Call us, email us, or visit our center at 123 Education Hub, New Delhi.",
  alternates: {
    canonical: 'https://levoraacademy.vercel.app/contact',
  },
  openGraph: {
    title: "Contact Us | Levora Academy — Get in Touch",
    description: "Reach out to Levora Academy for admissions queries, course information, or support. Call us, email us, or visit our center at 123 Education Hub, New Delhi.",
    url: 'https://levoraacademy.vercel.app/contact',
    images: [{ url: 'https://levoraacademy.vercel.app/api/og', width: 1200, height: 630 }],
  }
};

export default async function ContactPage() {
  let content = {};
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/cms/content?page=contact`, { 
      next: { revalidate: 0 } 
    });
    const data = await res.json();
    if (data.success) content = data.data;
  } catch (error) {
    console.error('Failed to fetch contact content', error);
  }

  return (
    <div className="bg-white min-h-screen pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema('Contact Us', 'https://levoraacademy.vercel.app/contact')) }}
      />
      <DynamicRenderer content={content} pageName="contact" />
    </div>
  );
}
