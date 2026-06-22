import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMe } from "../store/slices/authSlice.js";
import { Spinner } from "../components/ui/index.jsx";


// after succcessfull google sign in, gets user details and navigates user to home page 
export default function AuthCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMe()).then((action) => {
      if (action.payload) {
        navigate("/");
      } else {
        navigate("/login");
      }
    });
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Spinner />
        <p className="text-gray-500 mt-4">Signing you in...</p>
      </div>
    </div>
  );
}
