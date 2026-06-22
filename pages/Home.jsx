import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { jobService } from "../services/index.js";
import JobCard from "../components/job/JobCard.jsx";
import { Spinner } from "../components/ui/index.jsx";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["jobs", { page: 1, limit: 6 }],
    queryFn: () => jobService.getJobs({ page: 1, limit: 6 }).then((r) => r.data),
  });

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Find Your Next Dev Job
          </h1>
          <p className="mt-4 text-primary-100 text-lg">
            Thousands of software engineering jobs from top companies. Built for developers.
          </p>
          <div className="mt-8 flex gap-3 justify-center flex-wrap">
            <Link
              to="/jobs"
              className="bg-white text-primary-600 font-semibold px-6 py-3 rounded-xl hover:bg-primary-50 transition shadow"
            >
              Browse All Jobs
            </Link>
            <Link
              to="/recruiter/post-job"
              className="border border-white text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-500 transition"
            >
              Post a Job
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Jobs</h2>
          <Link to="/jobs" className="text-sm text-primary-600 font-medium hover:underline">
            View all →
          </Link>
        </div>

        {isLoading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.jobs?.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-gray-900 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold">Hiring developers?</h2>
        <p className="text-gray-400 mt-2">Post your job and reach thousands of developers.</p>
        <Link
          to="/register?role=recruiter"
          className="mt-6 inline-block bg-primary-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-primary-700 transition"
        >
          Post a Job Free
        </Link>
      </div>
    </div>
  );
}
