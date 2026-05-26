import DynamicRenderer from '@/components/DynamicRenderer';

export default async function Home() {
  let content = {};
  try {
    // Fetch dynamic content for homepage
    const res = await fetch('http://localhost:5000/api/cms/content?page=homepage', { 
      next: { revalidate: 0 } // Disable cache so it updates instantly
    });
    const data = await res.json();
    if (data.success) content = data.data;
  } catch (error) {
    console.error('Failed to fetch homepage content', error);
  }

  return (
    <>
      <DynamicRenderer content={content} pageName="homepage" />
    </>
  );
}
