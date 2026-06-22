import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authService } from "../services/index.js";
import { Button, Input, Card } from "../components/ui/index.jsx";

export function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async ({ email }) => {
    setError("");
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Forgot password?</h1>
          <p className="text-gray-500 mt-2">We'll send you a reset link</p>
        </div>

        <Card>
          {sent ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">📬</div>
              <p className="font-medium text-gray-900">Check your inbox</p>
              <p className="text-sm text-gray-500 mt-1">
                If that email is registered, a reset link has been sent.
              </p>
              <Link to="/login" className="mt-4 inline-block text-primary-600 text-sm hover:underline">
                Back to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                  {error}
                </div>
              )}
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register("email", { required: "Email is required" })}
              />
              <Button type="submit" loading={loading} className="w-full">
                Send Reset Link
              </Button>
              <Link to="/login" className="text-center text-sm text-gray-500 hover:underline">
                Back to login
              </Link>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}

export function ResetPassword() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const onSubmit = async ({ password }) => {
    setError("");
    setLoading(true);
    try {
      await authService.resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reset password</h1>
          <p className="text-gray-500 mt-2">Enter your new password</p>
        </div>
        <Card>
          {success ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">✅</div>
              <p className="font-medium">Password reset! Redirecting to login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                  {error}
                </div>
              )}
              <Input
                label="New Password"
                type="password"
                placeholder="Min 8 characters"
                error={errors.password?.message}
                {...register("password", { required: true, minLength: { value: 8, message: "Min 8 characters" } })}
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Repeat new password"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword", {
                  required: true,
                  validate: (v) => v === watch("password") || "Passwords don't match",
                })}
              />
              <Button type="submit" loading={loading} className="w-full">
                Reset Password
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}

export default ForgotPassword;
