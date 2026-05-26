import MaterialsGrid from '@/components/materials/MaterialsGrid';

export const metadata = {
  title: "Study Materials | Levora Academy",
};

export default function StudyMaterialsPage() {
  return (
    <div className="bg-white min-h-screen pt-20">
      <MaterialsGrid />
    </div>
  );
}
