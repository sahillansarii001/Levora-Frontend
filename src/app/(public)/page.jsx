import DynamicRenderer from '@/components/DynamicRenderer';

export default async function Home() {
  let content = {};
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

    // Fetch dynamic content for homepage
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/cms/content?page=homepage`, { 
      next: { revalidate: 0 }, // Disable cache so it updates instantly
      signal: controller.signal
    });
    clearTimeout(timeoutId);

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
