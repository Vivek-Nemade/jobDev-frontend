import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { setUser } from "../Store/slices/authSlice.js";
import { userService } from "../API_Services/index.js";
import { useAuth } from "../hooks/useAuth.js";
import { Button, Input, Card } from "../components/ui/index.jsx";

export default function Profile() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState(user?.skills || []);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || "",
      bio: user?.bio || "",
      experience: user?.experience || "",
      company: user?.company || "",
      companyWebsite: user?.companyWebsite || "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data) => {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => formData.append(k, v));
      skills.forEach((s) => formData.append("skills", s));
      if (photo) formData.append("photo", photo);
      return userService.updateProfile(formData);
    },
    onSuccess: (res) => {
      dispatch(setUser(res.data));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    },
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) setSkills([...skills, s]);
    setSkillInput("");
  };

  const removeSkill = (skill) => setSkills(skills.filter((s) => s !== skill));

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm mb-4">
          Profile updated successfully!
        </div>
      )}

      <Card>
        {/* Photo */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <img
            src={photoPreview || user?.photo || `https://ui-avatars.com/api/?name=${user?.name}&background=4f46e5&color=fff&size=80`}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <label className="cursor-pointer text-sm font-medium text-primary-600 hover:underline">
              Change photo
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
            </label>
            <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, WebP — max 2MB</p>
          </div>
        </div>

        <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="flex flex-col gap-4">
          <Input
            label="Full Name"
            error={errors.name?.message}
            {...register("name", { required: "Name is required" })}
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Bio</label>
            <textarea
              rows={3}
              placeholder="Tell recruiters about yourself..."
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
              {...register("bio")}
            />
          </div>

          {user?.role === "jobseeker" && (
            <>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Experience</label>
                <textarea
                  rows={3}
                  placeholder="Describe your work experience..."
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                  {...register("experience")}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Skills</label>
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
                        <button type="button" onClick={() => removeSkill(s)} className="text-primary-400 hover:text-primary-700 ml-1">×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {user?.role === "recruiter" && (
            <>
              <Input label="Company Name" {...register("company")} />
              <Input label="Company Website" type="url" {...register("companyWebsite")} />
            </>
          )}

          <div className="pt-2">
            <Button type="submit" loading={mutation.isPending} className="w-full">
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
