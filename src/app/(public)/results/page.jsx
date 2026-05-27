import DynamicRenderer from '@/components/DynamicRenderer';

export const metadata = {
  title: "Results & Achievements | Levora Academy",
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
      <DynamicRenderer content={content} pageName="results" />
    </div>
  );
}
