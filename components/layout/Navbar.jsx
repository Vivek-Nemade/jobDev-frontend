import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

export default function Navbar() {
  const { user, logout, isJobseeker, isRecruiter, isAdmin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const navLinkClass =({isActive})=>{
    `text-sm font-medium transition ${
      isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
    }`;
  }
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

          <div className="flex md:hidden items-center gap-3">
            {user && (
              <Link to="/profile" onClick={closeMenu}>
                <img className="" src={user.photo || user.name}
                  alt={user.name} className="h-8 w-8 rounded-full border border-gray-500" />
              </Link>
            )}

            <button onClick={()=> setMenuOpen((prev)=>!prev)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
              > 
                { setMenuOpen ?(
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                ):(
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                )}
            </button>
          </div>
        </div>
      </div>

      { menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-cool gap-4">
          <NavLink to="/jobs" onClick={closeMenu} className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`
              }> 
            Browse Jobs
          </NavLink>
          {!user ? (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900" onClick={closeMenu}>
              Login
              </Link>
              <Link to="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white text-center transition hover:bg-blue-700" onClick={closeMenu}>
              Sign Up
              </Link>
            </>
          ) :(
            <>
             {isJobseeker && (
              <>
                <NavLink to="/applications" className={navLinkClass} onClick={closeMenu}>
                      Applications
                  </NavLink>
                  <NavLink to="/saved-jobs" className={navLinkClass} onClick={closeMenu}>
                      Saved jobs
                  </NavLink>
              </>
            )}
            {isRecruiter && (
                <NavLink to="/recruiter" className={navLinkClass} onClick={closeMenu}>
                  Dashboard
                </NavLink>
              )}
              {isAdmin && (
                <NavLink to="/admin" className={navLinkClass} onClick={closeMenu}>
                  Admin
                </NavLink>
              )}
              <NavLink to="/profile" className={navLinkClass} onClick={closeMenu}>
                Profile
              </NavLink>
              <button
                onClick={() => { logout(); closeMenu(); }}
                className="text-left text-sm font-medium text-red-500 hover:text-red-700 transition"
              >
                Logout
              </button>
              </>
          )
        }
        </div>
      )}
    </nav>
  );
}
