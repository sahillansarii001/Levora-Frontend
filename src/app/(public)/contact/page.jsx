import DynamicRenderer from '@/components/DynamicRenderer';

export const metadata = {
  title: "Contact Us | Levora Academy",
};

export default async function ContactPage() {
  let content = {};
  try {
    const res = await fetch('http://localhost:5000/api/cms/content?page=contact', { 
      next: { revalidate: 0 } 
    });
    const data = await res.json();
    if (data.success) content = data.data;
  } catch (error) {
    console.error('Failed to fetch contact content', error);
  }

  return (
    <div className="bg-white min-h-screen pt-20">
      <DynamicRenderer content={content} pageName="contact" />
    </div>
  );
}
