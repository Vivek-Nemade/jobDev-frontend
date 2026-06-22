import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationService, jobService } from "../services/index.js";
import { Button, Card, StatusBadge, Select, Spinner, EmptyState } from "../components/ui/index.jsx";

const STATUS_OPTIONS = [
  { value: "applied", label: "Applied" },
  { value: "reviewed", label: "Reviewed" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "rejected", label: "Rejected" },
];

export default function JobApplicants() {
  const { jobId } = useParams();
  const queryClient = useQueryClient();

  const { data: job } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => jobService.getJob(jobId).then((r) => r.data),
  });

  const { data: applicants, isLoading } = useQuery({
    queryKey: ["applicants", jobId],
    queryFn: () => applicationService.getJobApplicants(jobId).then((r) => r.data),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => applicationService.updateStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries(["applicants", jobId]),
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-4">
        <Link to="/recruiter" className="text-sm text-primary-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applicants</h1>
          <p className="text-gray-500 mt-0.5">
            {job?.title} · {applicants?.length || 0} applicants
          </p>
        </div>
      </div>

      {applicants?.length === 0 ? (
        <EmptyState
          title="No applications yet"
          description="Share the job listing to attract candidates"
        />
      ) : (
        <div className="flex flex-col gap-4">
          {applicants.map((app) => (
            <Card key={app._id}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-3">
                  <img
                    src={app.applicant?.photo || `https://ui-avatars.com/api/?name=${app.applicant?.name}&background=4f46e5&color=fff`}
                    alt={app.applicant?.name}
                    className="w-10 h-10 rounded-full object-cover mt-0.5"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{app.applicant?.name}</p>
                    <p className="text-sm text-gray-500">{app.applicant?.email}</p>
                    {app.applicant?.skills?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {app.applicant.skills.slice(0, 5).map((s) => (
                          <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">{s}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <StatusBadge status={app.status} />
                  <p className="text-xs text-gray-400">
                    Applied {new Date(app.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                </div>
              </div>

              {app.coverLetter && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400 mb-1">Cover Letter</p>
                  <p className="text-sm text-gray-600">{app.coverLetter}</p>
                </div>
              )}

              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100 flex-wrap">
                {app.resumeUrl && (
                  <a href={app.resumeUrl} target="_blank" rel="noreferrer">
                    <Button variant="secondary" className="text-xs">📄 View Resume</Button>
                  </a>
                )}
                {app.applicant?.experience && (
                  <details className="flex-1">
                    <summary className="text-xs text-primary-600 cursor-pointer hover:underline">View Experience</summary>
                    <p className="text-sm text-gray-600 mt-2">{app.applicant.experience}</p>
                  </details>
                )}
                <div className="ml-auto">
                  <Select
                    options={STATUS_OPTIONS}
                    value={app.status}
                    onChange={(e) => updateMutation.mutate({ id: app._id, status: e.target.value })}
                    className="text-xs py-1.5"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
