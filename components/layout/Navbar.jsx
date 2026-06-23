import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
// import logo from "../../src/assets/logo.svg"
import logo1 from "../../src/assets/talent5.png"
import logo2 from "../../src/assets/talent4.svg"

// export default function Navbar() {
//   const { user, logout, isJobseeker, isRecruiter, isAdmin } = useAuth();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const closeMenu = () => setMenuOpen(false);

//   const navLinkClass =({isActive})=>{
//     `text-sm font-medium transition ${
//       isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
//     }`;
//   }
//   return (
//     <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">
//           <Link to="/" className="text-xl font-bold text-blue-600" onClick={closeMenu}>
//             JobDev
//           </Link>


//           <div className="hidden md:flex items-center gap-6">
//             <NavLink
//               to="/jobs"
//               className={navLinkClass}
//             >
//               Browse Jobs
//             </NavLink>

//           {!user ? (
//             <>
//               <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
//               >
//                 Sign Up
//               </Link>
//             </>
//                ):(
//                 <>
//                 {isJobseeker && (
//                   <>
//                     <NavLink  to="/applications" className={navLinkClass}>
//                       Applications
//                     </NavLink>

//                     <NavLink to="/saved-jobs"nclassName={navLinkClass}>
//                       Saved
//                     </NavLink>
//                   </>
//                 )}

//                {isRecruiter && (
//             <NavLink
//               to="/recruiter"
//               className={navLinkClass}
//             >
//               Dashboard
//             </NavLink>
//                )}

//                {isAdmin && (
//             <NavLink
//               to="/admin"
//               className={navLinkClass}
//             >
//               Admin
//             </NavLink>
//                 )}

//             <div className="flex items-center gap-3">
//               <Link to="/profile">
//                   <img className="" src={user.photo} 
//                   alt={user.name} className="h-8 w-8 rounded-full border border-gray-500" />
//               </Link>

//               <button  onClick={logout} className="text-sm font-medium text-gray-600 transition hover:text-red-600">
//                 Logout
//               </button>
//             </div>
//             </>
//           )}
//           </div>

//           <div className="flex md:hidden items-center gap-3">
//             {user && (
//               <Link to="/profile" onClick={closeMenu}>
//                 <img className="" src={user.photo || user.name}
//                   alt={user.name} className="h-8 w-8 rounded-full border border-gray-500" />
//               </Link>
//             )}

//             <button onClick={()=> setMenuOpen((prev)=>!prev)}
//               className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
//               > 
//                 { menuOpen ?(
//                   <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" clipRule="evenodd" />
//                   </svg>
//                 ):(
//                   <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
//                   </svg>
//                 )}
//             </button>
//           </div>
//         </div>
//       </div>

//       { menuOpen && (
//         <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-cool gap-4">
//           <NavLink to="/jobs" onClick={closeMenu} className={navLinkClass}> 
//             Browse Jobs
//           </NavLink>
//           {!user ? (
//             <>
//               <Link to="/login" className={navLinkClass} onClick={closeMenu}>
//               Login
//               </Link>
//               <Link to="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white text-center transition hover:bg-blue-700" onClick={closeMenu}>
//               Sign Up
//               </Link>
//             </>
//           ) :(
//             <>
//              {isJobseeker && (
//               <>
//                 <NavLink to="/applications" className={navLinkClass} onClick={closeMenu}>
//                       Applications
//                   </NavLink>
//                   <NavLink to="/saved-jobs" className={navLinkClass} onClick={closeMenu}>
//                       Saved jobs
//                   </NavLink>
//               </>
//             )}
//             {isRecruiter && (
//                 <NavLink to="/recruiter" className={navLinkClass} onClick={closeMenu}>
//                   Dashboard
//                 </NavLink>
//               )}
//               {isAdmin && (
//                 <NavLink to="/admin" className={navLinkClass} onClick={closeMenu}>
//                   Admin
//                 </NavLink>
//               )}
//               <NavLink to="/profile" className={navLinkClass} onClick={closeMenu}>
//                 Profile
//               </NavLink>
//               <button
//                 onClick={() => { logout(); closeMenu(); }}
//                 className="text-left text-sm font-medium text-red-500 hover:text-red-700 transition"
//               >
//                 Logout
//               </button>
//               </>
//           )
//         }
//         </div>
//       )}
//     </nav>
//   );
// }



export default function Navbar(){
  const { user, logout, isJobseeker, isRecruiter, isAdmin } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // const desktopLinkClass =({isActive})=>
  //   `text-sm font-medium transition ${isActive ? "text-blue-600" : "text-gray-900"}`;

  const desktopLinkClass = ({ isActive }) =>
  `rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
    isActive 
      ? "bg-blue-600 text-white shadow-sm" 
      : "text-blue-600 hover:bg-blue-50"
  }`;
  

  const mobileLinkClass =({isActive})=>`flex items-center gap-3 rounded-lg px-3 text-sm font-medium transition 
  ${isActive 
    ? "bg-blue-50 text-blue-600"
    : "text-gray-300 hover:bg-gray-800 hover:text-white"
  }`;

    const roleLabel = isAdmin ? "Admin" : isRecruiter ? "Recruiter" : "Jobseeker";
  return (
    <>
    {/* Desktop navbar */}
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
            <Link to="/"  onClick={closeMenu}>
              <img src={logo1} alt="TalentForge" className="h-12 w-auto" />
            </Link>

            <div className="hidden md:flex items-center gap-6">
                <NavLink to="/jobs" className={desktopLinkClass}>
                  Browse Jobs
                </NavLink>

                {
                  !user ? (
                    <>
                      <Link to="/login" className={desktopLinkClass}>
                        Login
                      </Link>
                      <Link to="/register" className={desktopLinkClass}>
                        Sign Up
                      </Link>
                    </>
                  ) :(
                    <>
                      { isJobseeker && (
                        <>
                        <NavLink to="/applications" className={desktopLinkClass}>
                          Appliations
                        </NavLink>
                        <NavLink to="/saved-jobs" className={desktopLinkClass}>
                          Saved
                        </NavLink>
                        </>
                      )}

                      {isRecruiter && (
                        <NavLink to="/recruiter" className={desktopLinkClass}>
                          Dashboard
                        </NavLink>
                      )}
                      {isAdmin && (
                        <NavLink to="/admin" className={desktopLinkClass}>
                          Admin
                        </NavLink>
                      )}

                      <div className="flex items-center gap-3">
                    <Link to="/profile">
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="h-8 w-8 rounded-full border border-gray-500 object-cover"
                      />
                    </Link>

                    <button
                      onClick={logout}
                      className="text-sm font-medium text-gray-600 transition hover:text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                    </>
                  )}
            </div>

             {/* Mobile hamburger */}
             <div className="flex md:hidden items-center gap-3">
                {user && (
                  <Link to="/profile" onClick={closeMenu}>
                    <img
                    src={user.photo}
                    alt={user.name}
                    className="h-8 w-8 rounded-full border border-gray-500 object-cover"
                  />
                  </Link>
                )}
                <button
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                    aria-label="Open menu"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
             </div>
        </div>
      </div>
    </nav>

     {/* Mobile slide in drawer */}
    <div onClick={closeMenu} className={`md:hidden fixed inset-0 z-50 bg-blcck/50 transition-opacity ${
      menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}/>

    <aside className={`md:hidden fixed inset-y-0 right-0 z-50 flex w-64 flex-col bg-[#0d0e2d] shadow-xl transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}>

          <div className="flex items-center justify-between px-3 py-3">
            <Link to="/" onClick={closeMenu} >
            <img src={logo2} alt="TalentForge" className="h-10 w-auto" />
          </Link>
            <button
              onClick={closeMenu}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition"
              aria-label="Close menu"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-4">

          {!user ? (
            <div className="flex flex-col gap-2">
              <Link
                to="/login"
                onClick={closeMenu}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-white hover:bg-gray-800 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="rounded-lg px-3 py-2.5  text-sm font-medium text-white hover:bg-gray-800 hover:text-white transition"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <>
              <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Menu
              </p>
              <nav className="flex flex-col gap-2">
                <NavLink to="/jobs" onClick={closeMenu} className={mobileLinkClass}>
                  <BriefcaseIcon />
                  Browse Jobs
                </NavLink>

                {isJobseeker && (
                  <>
                    <NavLink to="/applications" onClick={closeMenu} className={mobileLinkClass}>
                      <DocumentIcon />
                      Applications
                    </NavLink>
                    <NavLink to="/saved-jobs" onClick={closeMenu} className={mobileLinkClass}>
                      <BookmarkIcon />
                      Saved Jobs
                    </NavLink>
                  </>
                )}

                {isRecruiter && (
                  <NavLink to="/recruiter" onClick={closeMenu} className={mobileLinkClass}>
                    <GridIcon />
                    Dashboard
                  </NavLink>
                )}

                {isAdmin && (
                  <NavLink to="/admin" onClick={closeMenu} className={mobileLinkClass}>
                    <ShieldIcon />
                    Dashboard
                  </NavLink>
                )}
              </nav>

              <p className="px-3 pb-2 pt-6 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Account
              </p>
              <nav className="flex flex-col gap-2">
                <NavLink to="/profile" onClick={closeMenu} className={mobileLinkClass}>
                  <UserIcon />
                  Profile
                </NavLink>
              </nav>
            </>
          )}
        </div>

        {user && (
          <div className="border-t border-gray-800 px-3 py-4">
            <Link
              to="/profile"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-gray-800 transition"
            >
              {user.photo ? (
                <img
                  src={user.photo}
                  alt={user.name}
                  className="h-9 w-9 rounded-full border border-gray-600 object-cover"
                />
              ) : (
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                  {user.name}
                </span>
              )}
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-white">{user.name}</span>
                <span className="text-xs text-gray-400">{roleLabel}</span>
              </div>
            </Link>

            <button
              onClick={() => {
                logout();
                closeMenu();
              }}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-700 px-3 py-2.5 text-sm font-medium text-red-400 transition hover:bg-gray-800 hover:text-red-300"
            >
              <LogoutIcon />
              Logout
            </button>
          </div>
        )}

    </aside>
    </>
  )
}



function BriefcaseIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path d="M7 4a2 2 0 012-2h2a2 2 0 012 2v1h2.5A1.5 1.5 0 0117 6.5v2.879a23.85 23.85 0 01-7 1.621 23.85 23.85 0 01-7-1.62V6.5A1.5 1.5 0 014.5 5H7V4zm2-1a1 1 0 00-1 1v1h4V4a1 1 0 00-1-1H9z" />
      <path d="M3 12.6V15.5A1.5 1.5 0 004.5 17h11a1.5 1.5 0 001.5-1.5v-2.9a25.84 25.84 0 01-7 1.65v.001a25.84 25.84 0 01-7-1.65z" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V7.914a2 2 0 00-.586-1.414l-3.914-3.914A2 2 0 0012.086 2H4zm6 7a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 10-1.414-1.414L10 12.586V9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-3-5 3V4z" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path d="M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 12a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zM11 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zM11 12a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M9.661 2.237a.531.531 0 01.678 0 11.947 11.947 0 007.078 2.749.5.5 0 01.479.425c.069.52.104 1.05.104 1.589 0 5.052-3.12 9.36-7.5 11.143a.5.5 0 01-.4 0C5.72 16.476 2.6 12.168 2.6 7.118c0-.538.035-1.069.104-1.589a.5.5 0 01.48-.425 11.947 11.947 0 007.077-2.667z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
        clipRule="evenodd"
      />
      <path d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z" />
    </svg>
  );
}