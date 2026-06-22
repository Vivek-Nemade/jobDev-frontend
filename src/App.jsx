import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMe } from "../Store/slices/authSlice.js";
import { useAuth } from "../hooks/useAuth.js";

import Navbar from "../components/layout/Navbar.jsx";

import Home from "../pages/Home.jsx";
import Register from "../pages/Register.jsx";
import Login  from "../pages/Login.jsx";
import Jobs from "../pages/Jobs.jsx";
import VerifyOTP from "../pages/VerifyOTP.jsx";
import AuthCallback from "../pages/AuthCallback.jsx";
import Profile from "../pages/Profile.jsx";
import PostJob from "../pages/PostJob.jsx";
import RecruiterDashboard from "../pages/RecruiterDashboard.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import JobDetail from "../pages/JobDetail.jsx";
import SavedJobs from "../pages/SavedJobs.jsx";
import MyApplications from "../pages/MyApplications.jsx";
import JobApplicants from "../pages/JobApplicants.jsx";
import ForgotPassword, { ResetPassword } from "../pages/ForgotPassword.jsx";


const PrivateRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />

        {/* Guest only */}
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Jobseeker */}
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/applications" element={<PrivateRoute roles={["jobseeker"]}><MyApplications /></PrivateRoute>} />
        <Route path="/saved-jobs" element={<PrivateRoute roles={["jobseeker"]}><SavedJobs /></PrivateRoute>} />

        {/* Recruiter */}
        <Route path="/recruiter" element={<PrivateRoute roles={["recruiter"]}><RecruiterDashboard /></PrivateRoute>} />
        <Route path="/recruiter/post-job" element={<PrivateRoute roles={["recruiter"]}><PostJob /></PrivateRoute>} />
        <Route path="/recruiter/jobs/:jobId/applicants" element={<PrivateRoute roles={["recruiter"]}><JobApplicants /></PrivateRoute>} />

        {/* Admin */}
        <Route path="/admin" element={<PrivateRoute roles={["admin"]}><AdminDashboard /></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}