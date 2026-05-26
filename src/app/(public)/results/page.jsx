import ResultsGrid from '@/components/results/ResultsGrid';

export const metadata = {
  title: "Results & Achievements | Levora Academy",
};

export default function ResultsPage() {
  return (
    <div className="bg-white min-h-screen pt-20">
      <ResultsGrid />
    </div>
  );
}
