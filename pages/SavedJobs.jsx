import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { userService } from "../services/index.js";
import JobCard from "../components/job/JobCard.jsx";
import { Spinner, EmptyState } from "../components/ui/index.jsx";

export default function SavedJobs() {
  const { data: saved, isLoading } = useQuery({
    queryKey: ["savedJobs"],
    queryFn: () => userService.getSavedJobs().then((r) => r.data),
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Saved Jobs</h1>

      {saved?.length === 0 ? (
        <EmptyState
          title="No saved jobs"
          description="Star jobs you're interested in to save them here"
          action={<Link to="/jobs" className="text-primary-600 text-sm font-medium hover:underline">Browse Jobs →</Link>}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {saved.map((s) => (
            <JobCard key={s._id} job={s.job} saved />
          ))}
        </div>
      )}
    </div>
  );
}
