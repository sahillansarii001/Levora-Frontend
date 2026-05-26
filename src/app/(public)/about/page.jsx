import DynamicRenderer from '@/components/DynamicRenderer';

export const metadata = {
  title: "About Us | Levora Academy",
};

export default async function AboutPage() {
  let content = {};
  try {
    const res = await fetch('http://localhost:5000/api/cms/content?page=about', { 
      next: { revalidate: 0 } 
    });
    const data = await res.json();
    if (data.success) content = data.data;
  } catch (error) {
    console.error('Failed to fetch about content', error);
  }

  return (
    <div className="bg-white min-h-screen pt-20">
      <DynamicRenderer content={content} pageName="about" />
    </div>
  );
}
