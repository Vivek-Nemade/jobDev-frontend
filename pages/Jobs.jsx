import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { jobService } from "../services/index.js";
import { useDebounce } from "../hooks/useDebounce.js";
import JobCard from "../components/job/JobCard.jsx";
import { Input, Select, Button, Spinner, EmptyState } from "../components/ui/index.jsx";

const JOB_TYPES = [
  { value: "", label: "All Types" },
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "remote", label: "Remote" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 400);
  const debouncedLocation = useDebounce(location, 400);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobs", { search: debouncedSearch, location: debouncedLocation, type, page }],
    queryFn: () =>
      jobService.getJobs({ search: debouncedSearch, location: debouncedLocation, type, page, limit: 12 })
        .then((r) => r.data),
    keepPreviousData: true,
  });

  const handleReset = () => {
    setSearch("");
    setLocation("");
    setType("");
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Browse Jobs</h1>
        <p className="text-gray-500 mt-1">
          {data?.total ?? "..."} jobs available
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-48">
          <Input
            label="Search"
            placeholder="Job title, skills, company..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <div className="flex-1 min-w-36">
          <Input
            label="Location"
            placeholder="City or remote"
            value={location}
            onChange={(e) => { setLocation(e.target.value); setPage(1); }}
          />
        </div>
        <div className="min-w-36">
          <Select
            label="Job Type"
            options={JOB_TYPES}
            value={type}
            onChange={(e) => { setType(e.target.value); setPage(1); }}
          />
        </div>
        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>

      {/* Results */}
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <div className="text-center py-12 text-red-500">Failed to load jobs. Try again.</div>
      ) : data?.jobs?.length === 0 ? (
        <EmptyState
          title="No jobs found"
          description="Try adjusting your search or filters"
          action={<Button variant="secondary" onClick={handleReset}>Clear filters</Button>}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>

          {/* Pagination */}
          {data.pages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                variant="secondary"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ← Prev
              </Button>
              <span className="text-sm text-gray-500 px-4">
                Page {page} of {data.pages}
              </span>
              <Button
                variant="secondary"
                onClick={() => setPage((p) => Math.min(data.pages, p + 1))}
                disabled={page === data.pages}
              >
                Next →
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
