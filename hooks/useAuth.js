import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Store/slices/authSlice.js";
import { useNavigate } from "react-router-dom";


export const useAuth = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return {
    user,
    loading,
    logout,
    isAuthenticated: !!user,
    isJobseeker: user?.role === "jobseeker",
    isRecruiter: user?.role === "recruiter",
    isAdmin: user?.role === "admin",
  };
};
