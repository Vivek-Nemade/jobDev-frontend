import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { setUser } from "../store/slices/authSlice.js";
import { authService } from "../services/index.js";
import { Button, Input, Card } from "../components/ui/index.jsx";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    try {
      const res = await authService.login(data);
      dispatch(setUser(res.data.user));
      navigate("/");
    } catch (err) {
      console.log(err.response);
      const msg = err.response?.data?.message;
      if (err.response?.data?.userId) {
        navigate("/verify-otp", { state: { userId: err.response.data.userId } });
        return;
      }
      setError(msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-2">Sign in to your JobDev account</p>
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
              label="Email"
              type="email"
              placeholder="you@google.com"
              error={errors.email?.message}
              {...register("email", { required: "Email is required" })}
            />
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register("password", { required: "Password is required" })}
              />
              <Link to="/forgot-password" className="text-xs text-primary-600 hover:underline mt-1 block text-right">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" loading={loading} className="w-full mt-2">
              Sign In
            </Button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-400">or continue with</span>
            </div>
          </div>
          <div className="justify-center flex gap-2">
          <a
            // href="http://localhost:5000/api/v1/auth/google?role=jobseeker"
            href="https://jobdev-backend.onrender.com/api/v1/auth/google?role=jobseeker"
            className="flex items-center justify-center gap-2 w-full border border-gray-300 
                        rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors duration-300 hover:bg-blue-100"
          >
            <svg className="w-10 h-10"viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google as Jobseeker
          </a>
          <a 
            // href="http://localhost:5000/api/v1/auth/google?role=recruiter"
            href="https://jobdev-backend.onrender.com/api/v1/auth/google?role=recruiter"
            className="flex items-center justify-center gap-2 w-full border border-gray-300 
            rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors duration-300 hover:bg-blue-100"
          >
            <svg className="w-10 h-10" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google as Recruiter
          </a>
          </div>
        </Card>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
