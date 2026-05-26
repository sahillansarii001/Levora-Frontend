import CoursesGrid from '@/components/courses/CoursesGrid';

export const metadata = {
  title: "Courses | Levora Academy",
};

export default function CoursesPage() {
  return (
    <div className="bg-white min-h-screen pt-20">
      <CoursesGrid />
    </div>
  );
}
