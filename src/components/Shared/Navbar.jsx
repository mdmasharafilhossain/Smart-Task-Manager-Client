import { Link, NavLink } from "react-router";
import { Menu } from "lucide-react";
import { useContext,  useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import Swal from "sweetalert2";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Teams", path: "/teams" },
    { name: "Projects", path: "/projects" },
    { name: "Tasks", path: "/tasks" },
  ];
 const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#8FABD4",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire("Logged out", "You have been successfully logged out.", "success");
      }
    });
  };


  return (
    <nav className="w-full bg-[#EFECE3] text-black shadow-xl">
      <div className="container  mx-auto px-4 py-3 flex items-center justify-between">

       
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#8FABD4] rounded-xl flex items-center justify-center text-xl font-bold">
            TM
          </div>
          <span className="text-xl font-semibold hidden sm:block">Task Manager</span>
        </Link>

     
        <div className="hidden md:flex items-center justify-center align-middle gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-base hover:text-[#8fabd4] transition ${
                  isActive ? "text-[#8FABD4] font-semibold" : "text-[#4A4A4A]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-[#4A4A4A] font-medium">
                {user?.name || "User"}
              </span>

              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-lg text-white"
                style={{
                  background: "linear-gradient(90deg,#8FABD4,#6FA8D6)",
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="text-base font-medium hover:text-[#8FABD4]"
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#4A4A4A] hover:text-[#8FABD4]"
          onClick={() => setOpen(!open)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#EFECE3] px-4 pb-4 flex flex-col gap-3 border-t border-[#8FABD4]/30">

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block py-2 text-base border-b border-[#8FABD4] hover:text-[#8FABD4] transition ${
                  isActive ? "text-[#8FABD4] font-semibold" : "text-[#4A4A4A]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Mobile user area */}
          {user ? (
            <div className="flex flex-col gap-2 mt-3">
              <span className="text-[#4A4A4A] font-medium">
                {user?.name || "User"}
              </span>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="py-2 rounded-lg text-white"
                style={{
                  background: "linear-gradient(90deg,#8FABD4,#6FA8D6)",
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="text-base underline text-[#4A4A4A] mt-2"
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
}
