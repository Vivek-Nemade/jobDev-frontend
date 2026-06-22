import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { user, logout, isJobseeker, isRecruiter, isAdmin } = useAuth();
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-xl font-bold text-blue-600">
            JobDev
          </Link>

          <div className="flex items-center gap-6">
            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              Browse Jobs
            </NavLink>

          {!user ? (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
               ):(
                <>
                {isJobseeker && (
                  <>
                    <NavLink  to="/applications"
                      className={({ isActive }) =>
                        `text-sm font-medium ${
                          isActive
                            ? "text-blue-600"
                            : "text-gray-600 hover:text-gray-900"
                        }`
                      }
                    >
                      Applications
                    </NavLink>

                    <NavLink
                      to="/saved-jobs"
                      className={({ isActive }) =>
                        `text-sm font-medium ${
                          isActive
                            ? "text-blue-600"
                            : "text-gray-600 hover:text-gray-900"
                        }`
                      }
                    >
                      Saved
                    </NavLink>
            </>
                )}

               {isRecruiter && (
            <NavLink
              to="/recruiter"
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              Dashboard
            </NavLink>
               )}

               {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              Admin
            </NavLink>
                )}

            <div className="flex items-center gap-3">
              <Link to="/profile">
                  <img className="" src={user.photo} 
                  alt={user.name} className="h-8 w-8 rounded-full border border-gray-500" />
              </Link>

              <button  onClick={logout} className="text-sm font-medium text-gray-600 transition hover:text-red-600">
                Logout
              </button>
            </div>
            </>
          )}
          </div>
        </div>
      </div>
    </nav>
  );
}
