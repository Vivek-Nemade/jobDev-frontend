import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { jobService } from "../services/index.js";
import { Button, Card, StatusBadge, Spinner, EmptyState } from "../components/ui/index.jsx";

export default function RecruiterDashboard() {
  const queryClient = useQueryClient();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ["myJobs"],
    queryFn: () => jobService.getMyJobs().then((r) => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => jobService.deleteJob(id),
    onSuccess: () => queryClient.invalidateQueries(["myJobs"]),
  });

  if (isLoading) return <Spinner />;

  const stats = {
    total: jobs?.length || 0,
    approved: jobs?.filter((j) => j.status === "approved").length || 0,
    pending: jobs?.filter((j) => j.status === "pending").length || 0,
    totalApplicants: jobs?.reduce((sum, j) => sum + (j.applicantCount || 0), 0) || 0,
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Recruiter Dashboard</h1>
        <Link to="/recruiter/post-job">
          <Button>+ Post a Job</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Jobs", value: stats.total },
          { label: "Approved", value: stats.approved },
          { label: "Pending", value: stats.pending },
          { label: "Total Applicants", value: stats.totalApplicants },
        ].map(({ label, value }) => (
          <Card key={label} className="text-center !p-4">
            <p className="text-2xl font-bold text-primary-600">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
          </Card>
        ))}
      </div>

      {/* Job listings */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Job Listings</h2>

      {jobs?.length === 0 ? (
        <EmptyState
          title="No jobs posted yet"
          description="Post your first job to start receiving applications"
          action={
            <Link to="/recruiter/post-job">
              <Button>Post a Job</Button>
            </Link>
          }
        />
      ) : (
        <div className="flex flex-col gap-3">
          {jobs.map((job) => (
            <Card key={job._id} className="!p-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {job.location} · {job.type} · {job.applicantCount || 0} applicants
                  </p>
                  <div className="mt-2">
                    <StatusBadge status={job.status} />
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Link to={`/recruiter/jobs/${job._id}/applicants`}>
                    <Button variant="secondary" className="text-xs">
                      View Applicants ({job.applicantCount || 0})
                    </Button>
                  </Link>
                  <Link to={`/recruiter/post-job?edit=${job._id}`}>
                    <Button variant="secondary" className="text-xs">Edit</Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="text-xs"
                    loading={deleteMutation.isPending}
                    onClick={() => {
                      if (confirm("Delete this job? All applications will be removed.")) {
                        deleteMutation.mutate(job._id);
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
