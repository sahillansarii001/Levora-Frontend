import DynamicRenderer from '@/components/DynamicRenderer';

export default async function AdmissionsPage() {
  let content = {};
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/cms/content?page=admissions`, { 
      next: { revalidate: 0 } 
    });
    const data = await res.json();
    if (data.success) content = data.data;
  } catch (error) {
    console.error('Failed to fetch admissions page content', error);
  }

  // If content is completely empty, provide fallback UI using the hardcoded blocks in DynamicRenderer format,
  // or just let it be blank until they add CMS content. As agreed, it will be blank if empty.
  
  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      <DynamicRenderer content={content} pageName="admissions" />
    </div>
  );
}
