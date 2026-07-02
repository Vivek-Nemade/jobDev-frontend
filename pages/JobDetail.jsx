import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { jobService, applicationService, userService } from "../API_Services/index.js";
import { useAuth } from "../hooks/useAuth.js";
import { Button, Badge, StatusBadge, Spinner, Card } from "../components/ui/index.jsx";


function ApplyModal({ jobId, onClose, onSuccess }) {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("coverLetter", coverLetter);
      return applicationService.apply(jobId, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myApplications"]);
      onSuccess();
    },
    onError: (err) => setError(err.response?.data?.message || "Application failed"),
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Apply for this job</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-4">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resume (PDF only, max 5MB)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResume(e.target.files[0])}
              className="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary-50 file:text-primary-700 file:font-medium hover:file:bg-primary-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Letter (optional)
            </label>
            <textarea
              rows={4}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Why are you a great fit for this role?"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="flex-1"
            loading={mutation.isPending}
            disabled={!resume}
            onClick={() => mutation.mutate()}
          >
            Submit Application
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function JobDetail() {
  const { id } = useParams();
  const {  isJobseeker } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [applied, setApplied] = useState(false);
  const queryClient = useQueryClient();
  
  const { data: job, isLoading } = useQuery({
    queryKey: ["job", id],
    queryFn: () => jobService.getJob(id).then((r) => r.data),
  });
  // console.log(job.deadline);
const isSaved=job?.isSaved ?? false;
const isDeadlineOver = new Date() > new Date(job?.deadline);


  const saveMutation = useMutation({
    mutationFn: () => userService.saveJob(id),
    onSuccess: (data) => {
      // setIsSaved(data.saved);
      // queryClient.invalidateQueries(["savedJobs"])
      queryClient.invalidateQueries({queryKey: ["savedJobs"]});

      queryClient.setQueryData(["jobs",id],(oldData)=>{
        if(!oldData) return oldData;
        return{
          ...oldData,
          isSaved:data.isSaved
        }
      })
    },
  });

  if (isLoading) return <Spinner />;
  if (!job) return <div className="text-center py-12">Job not found</div>;

  const salary =
    job.salary?.min && job.salary?.max
      ? `₹${(job.salary.min / 1000).toFixed(0)}k – ₹${(job.salary.max / 1000).toFixed(0)}k`
      : "Not specified";

  const actionButton=()=>{
  if(applied){
    return (
        <div className="flex items-center gap-2 text-sm text-green-600 font-medium px-4 py-2 bg-green-50 rounded-lg">
                  ✓ Applied
                </div>
    );
  }
  if(isDeadlineOver){
    return(
       <Button disabled className="bg-gray-100 text-gray-400 cursor-not-allowed">Application Closed</Button>
    )
  }
  return(
    <Button onClick={() => setShowModal(true)} disabled={job.status !== "approved"}>
                  Apply Now
                </Button>
  )
}

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {showModal && (
        <ApplyModal
          jobId={id}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            setApplied(true);
          }}
        />
      )}

      <div className="mb-4">
        <Link to="/jobs" className="text-sm text-primary-600 hover:underline">
          ← Back to Jobs
        </Link>
      </div>

      <Card className="mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-gray-500 mt-1">{job.company}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              <Badge color="blue">{job.type}</Badge>
              <StatusBadge status={job.status} />
            </div>
          </div>

          {isJobseeker && (
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => saveMutation.mutate()}
                loading={saveMutation.isPending}
              >
                {isSaved ? "★ Saved" : "☆ Save"}
              </Button>
              {/* {applied ? (
                <div className="flex items-center gap-2 text-sm text-green-600 font-medium px-4 py-2 bg-green-50 rounded-lg">
                  ✓ Applied
                </div>
              ) : 
              isDeadlineOver ?(
                <Button disabled className="bg-gray-100 text-gray-400 cursor-not-allowed">Application Closed</Button>
              ):
              (
                <Button onClick={() => setShowModal(true)} disabled={job.status !== "approved"}>
                  Apply Now
                </Button>
              )} */}
              {actionButton()}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
          {[
            { label: "Location", value: job.location },
            { label: "Salary", value: salary },
            { label: "Type", value: job.type },
            { label: "Applicants", value: job.applicantCount ?? 0 },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
              <p className="text-sm font-medium text-gray-900 mt-0.5 capitalize">{value}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h2>
            <p className="text-gray-600 whitespace-pre-line leading-relaxed">{job.description}</p>
          </Card>

          {job.skills?.length > 0 && (
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <h2 className="text-base font-semibold text-gray-900 mb-3">About the Recruiter</h2>
            <div className="flex items-center gap-3">
              <img
                src={job.postedBy?.photo || `https://ui-avatars.com/api/?name=${job.postedBy?.name}&background=4f46e5&color=fff`}
                alt={job.postedBy?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{job.postedBy?.name}</p>
                <p className="text-xs text-gray-500">{job.postedBy?.company}</p>
              </div>
            </div>
            {job.postedBy?.bio && (
              <p className="text-sm text-gray-500 mt-3">{job.postedBy.bio}</p>
            )}
            {job.postedBy?.companyWebsite && (
              <a
                href={job.postedBy.companyWebsite}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block text-sm text-primary-600 hover:underline"
              >
                Visit website →
              </a>
            )}
          </Card>

          <Card>
            <p className="text-xs text-gray-400">Posted on</p>
            <p className="text-sm font-medium">
              {new Date(job.createdAt).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </p>
            {job.deadline && (
              <>
                <p className="text-xs text-gray-400 mt-2">Apply before</p>
                <p className="text-sm font-medium">
                  {new Date(job.deadline).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric",
                  })}
                </p>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
