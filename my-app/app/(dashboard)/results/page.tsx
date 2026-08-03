import PageHeader from "@/components/layout/PageHeader";
import ResultsStats from "@/components/results/ResultsStats";
import { results } from "@/lib/data/results";

export default function ResultsPage() {
  return (
    <div className="space-y-6 px-4 py-4">
      <PageHeader
        title="Results"
        description="View, verify and publish examination results"
      />

      <ResultsStats results={results} />
    </div>
  );
}
