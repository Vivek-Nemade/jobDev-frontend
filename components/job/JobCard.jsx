import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../../API_Services";
import { Badge, StatusBadge } from "../ui";



const JOB_TYPE_COLORS = {
  "full-time": "blue",
  "part-time": "purple",
  remote: "green",
  contract: "yellow",
  internship: "gray",
};

export default function JobCard({ job, saved = false }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: () => userService.saveJob(job._id),
    onSuccess: () => {
      queryClient.invalidateQueries(["savedJobs"]);
    },
  });

  const salary =
    job.salary?.min && job.salary?.max
      ? `$${(job.salary.min / 1000).toFixed(0)}k - $${(job.salary.max / 1000).toFixed(0)}k`
      : job.salary?.min
      ? `From $${(job.salary.min / 1000).toFixed(0)}k`
      : null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <Link
            to={`/jobs/${job._id}`}
            className="text-base font-semibold text-gray-900 hover:text-primary-600 transition line-clamp-1"
          >
            {job.title}
          </Link>
          <p className="text-sm text-gray-500 mt-0.5">{job.company}</p>
        </div>

        {user?.role === "jobseeker" && (
          <button
            onClick={() => saveMutation.mutate()}
            className="text-gray-400 hover:text-primary-600 transition mt-0.5"
            title={saved ? "Unsave" : "Save job"}
          >
            {saved ? "★" : "☆"}
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-3">
        <Badge color={JOB_TYPE_COLORS[job.type] || "gray"}>{job.type}</Badge>
        <span className="text-xs text-gray-500">📍 {job.location}</span>
        {salary && <span className="text-xs text-gray-500">💰 {salary}</span>}
        <StatusBadge status={job.status} />
      </div>

      {job.skills?.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {job.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="text-xs text-gray-400">+{job.skills.length - 4} more</span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">
          {new Date(job.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
        <Link
          to={`/jobs/${job._id}`}
          className="text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}