import React from "react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="mt-12">
      <div className="w-full bg-[#EFECE3] backdrop-blur-sm border-t border-[#8FABD4]/20 py-8">
        
        {/* Logo + Brand */}
        <div className="flex flex-col items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#8FABD4] rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-md">
            TM
          </div>
          <h3 className="text-xl font-semibold text-[#1F2937] tracking-wide">
            Task Manager
          </h3>
          <p className="text-sm text-[#4A4A4A]">
            Empowering teams to stay organized and productive.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 text-[#4A4A4A] text-sm mt-4">
          <Link to="/dashboard" className="hover:text-[#8FABD4] transition">Dashboard</Link>
          <Link to="/teams" className="hover:text-[#8FABD4] transition">Teams</Link>
          <Link to="/projects" className="hover:text-[#8FABD4] transition">Projects</Link>
          <Link to="/tasks" className="hover:text-[#8FABD4] transition">Tasks</Link>
        </div>

        {/* Divider */}
        <div className="w-full max-w-xl mx-auto border-t border-[#8FABD4]/20 mt-6"></div>

        {/* Bottom Text */}
        <div className="text-center text-sm text-[#6B7280] mt-4">
          Designed with care • Built for productivity  
          <br />
          © {new Date().getFullYear()} Task Manager. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
