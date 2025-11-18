import { Link, NavLink } from "react-router";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Teams", path: "/teams" },
    { name: "Projects", path: "/projects" },
    { name: "Tasks", path: "/tasks" },
    { name: "Login", path: "/login" },
  ];

  return (
    <nav className="w-full bg-[#EFECE3] text-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#8FABD4] rounded-xl flex items-center justify-center text-xl font-bold">
            TM
          </div>
          <span className="text-xl font-semibold hidden sm:block">Task Manager</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-base hover:text-[#8FABD4] transition ${
                  isActive ? "text-[#8FABD4] font-semibold" : "text-[#4A4A4A]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#4A4A4A] hover:text-white"
          onClick={() => setOpen(!open)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#EFECE3] px-4 pb-4 flex flex-col gap-3">
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
        </div>
      )}
    </nav>
  );
}
