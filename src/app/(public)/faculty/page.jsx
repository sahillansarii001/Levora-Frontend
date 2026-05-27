import DynamicRenderer from '@/components/DynamicRenderer';

export const metadata = {
  title: "Faculty | Levora Academy",
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
      <DynamicRenderer content={content} pageName="faculty" />
    </div>
  );
}
