import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authService } from "../API_Services/index.js";
import { Button, Input, Card } from "../components/ui/index.jsx";

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    try {
      const res = await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });
      navigate("/verify-otp", { state: { userId: res.data.userId } });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create account</h1>
          <p className="text-gray-500 mt-2">Join TalentForge today</p>
        </div>

        <Card>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-4">
              {error}
            </div>
          )}
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3  mb-4">
              <h1 >Note: You need to verify your email before you can login</h1>
              <p>As Mailtrap Sandbpox is used to catch OTP emails , It won't work on live Website</p>
              <p className="text-blue-600">Use Google login instead</p>
            </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="Full Name"
              placeholder="John Doe"
              error={errors.name?.message}
              {...register("name", { required: "Name is required", minLength: { value: 2, message: "Name too short" } })}
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email", { required: "Email is required" })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Min 8 characters"
              error={errors.password?.message}
              {...register("password", { required: "Password is required", minLength: { value: 8, message: "Min 8 characters" } })}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Repeat your password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (val) => val === watch("password") || "Passwords don't match",
              })}
            />

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">I am a...</label>
              <div className="grid grid-cols-2 gap-3">
                {["jobseeker", "recruiter"].map((role) => (
                  <label
                    key={role}
                    className={`flex items-center gap-2 border rounded-lg px-4 py-3 cursor-pointer transition ${
                      watch("role") === role
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input type="radio" value={role} className="hidden" {...register("role", { required: true })} />
                    <span className="text-sm font-medium capitalize">{role === "jobseeker" ? "Job Seeker" : "Recruiter"}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button type="submit" loading={loading} className="w-full mt-2">
              Create Account
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
