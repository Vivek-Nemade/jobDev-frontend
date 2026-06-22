import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { jobService } from "../API_Services/index.js";
import { Button, Input, Select, Card } from "../components/ui/index.jsx";

const JOB_TYPES = [
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "remote", label: "Remote" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

export default function PostJob() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const isEditing = !!editId;

  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Load existing job if editing
  const { data: existingJob } = useQuery({
    queryKey: ["job", editId],
    queryFn: () => jobService.getJob(editId).then((r) => r.data),
    enabled: isEditing,
  });

  useEffect(() => {
    if (existingJob) {
      reset({
        title: existingJob.title,
        description: existingJob.description,
        company: existingJob.company,
        location: existingJob.location,
        type: existingJob.type,
        "salary.min": existingJob.salary?.min,
        "salary.max": existingJob.salary?.max,
        deadline: existingJob.deadline?.split("T")[0],
        skills: existingJob.skills || [],
      });
      // setSkills(existingJob.skills || []);
    }
  }, [existingJob, reset]);

  const mutation = useMutation({
    mutationFn: (data) =>
      isEditing ? jobService.updateJob(editId, data) : jobService.createJob(data),
    onSuccess: () => navigate("/recruiter"),
    onError: (err) => setError(err.response?.data?.message || "Failed to save job"),
  });

  const onSubmit = (data) => {
    setError("");
    mutation.mutate({
      ...data,
      skills,
      // salary: {
      //   min: data.salary.min ? Number(data["salary.min"]) : undefined,
      //   max: data.salary.max ? Number(data["salary.max"]) : undefined,
      // },
    });
  };

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) setSkills([...skills, s]);
    setSkillInput("");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {isEditing ? "Edit Job" : "Post a New Job"}
      </h1>

      <Card>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Job Title *"
            placeholder="e.g. Senior React Developer"
            error={errors.title?.message}
            {...register("title", { required: "Title is required" })}
          />
          <Input
            label="Company Name *"
            placeholder="Your company name"
            error={errors.company?.message}
            {...register("company", { required: "Company is required" })}
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Description *</label>
            <textarea
              rows={6}
              placeholder="Describe the role, responsibilities, and requirements..."
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Location *"
              placeholder="e.g. New York, NY"
              error={errors.location?.message}
              {...register("location", { required: "Location is required" })}
            />
            <Select
              label="Job Type *"
              options={JOB_TYPES}
              error={errors.type?.message}
              {...register("type", { required: "Type is required" })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Min Salary (₹)" type="number" placeholder="e.g. 60000" {...register("salary.min",{valueAsNumber:true})} />
            <Input label="Max Salary (₹)" type="number" placeholder="e.g. 90000" {...register("salary.max",{valueAsNumber:true})} />
          </div>

          <Input label="Application Deadline" type="date" {...register("deadline")} />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Required Skills</label>
            <div className="flex gap-2">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                placeholder="Type a skill and press Enter"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
              <Button type="button" variant="secondary" onClick={addSkill}>Add</Button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((s) => (
                  <span key={s} className="flex items-center gap-1 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                    {s}
                    <button type="button" onClick={() => setSkills(skills.filter((x) => x !== s))} className="text-primary-400 hover:text-primary-700 ml-1">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" className="flex-1" onClick={() => navigate("/recruiter")}>
              Cancel
            </Button>
            <Button type="submit" loading={mutation.isPending} className="flex-1">
              {isEditing ? "Save Changes" : "Post Job"}
            </Button>
          </div>
        </form>
      </Card>

      {!isEditing && (
        <p className="text-xs text-gray-400 text-center mt-3">
          Jobs are reviewed by admins before going live.
        </p>
      )}
    </div>
  );
}
