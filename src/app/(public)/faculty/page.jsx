import FacultyGrid from '@/components/faculty/FacultyGrid';

export const metadata = {
  title: "Faculty | Levora Academy",
};

export default function FacultyPage() {
  return (
    <div className="bg-white min-h-screen pt-20">
      <FacultyGrid />
    </div>
  );
}
