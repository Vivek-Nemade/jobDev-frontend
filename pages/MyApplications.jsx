import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { applicationService } from "../services/index.js";
import { Card, StatusBadge, Spinner, EmptyState } from "../components/ui/index.jsx";

export default function MyApplications() {
  const { data: applications, isLoading } = useQuery({
    queryKey: ["myApplications"],
    queryFn: () => applicationService.getMyApplications().then((r) => r.data),
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Applications</h1>

      {applications?.length === 0 ? (
        <EmptyState
          title="No applications yet"
          description="Start applying to jobs that match your skills"
          action={<Link to="/jobs" className="text-primary-600 text-sm font-medium hover:underline">Browse Jobs →</Link>}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {applications.map((app) => (
            <Card key={app._id} className="hover:shadow-md transition">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <Link
                    to={`/jobs/${app.job?._id}`}
                    className="font-semibold text-gray-900 hover:text-primary-600"
                  >
                    {app.job?.title}
                  </Link>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {app.job?.company} · {app.job?.location}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Applied {new Date(app.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <StatusBadge status={app.status} />
                  {app.resumeUrl && (
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-primary-600 hover:underline"
                    >
                      View Resume
                    </a>
                  )}
                </div>
              </div>

              {app.coverLetter && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Cover Letter</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{app.coverLetter}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
