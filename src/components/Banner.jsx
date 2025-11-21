// Banner.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <header className="bg-[#EFECE3]">
      {/* Decorative top wave */}
      <div className="relative overflow-hidden">
        <div className="absolute -left-40 -top-24 w-80 h-80 rounded-full bg-[#8FABD4]/10 blur-3xl animate-blob"></div>
        <div className="absolute right-0 -top-16 w-64 h-64 rounded-full bg-[#8FABD4]/8 blur-2xl animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left: copy */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-white/80 border border-[#8FABD4]/20 px-3 py-1 rounded-full shadow-sm w-max">
                <span className="w-8 h-8 bg-[#8FABD4] rounded-lg flex items-center justify-center text-white font-bold">TM</span>
                <span className="text-sm text-[#4A4A4A] font-medium">Task Manager</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F2937] leading-tight">
                Organize work. <span className="text-[#8FABD4]">Ship faster.</span> Delight teams.
              </h1>

              <p className="text-[#4A4A4A] max-w-xl">
                Powerful yet simple task and project management built for growing teams.
                Manage projects, assign tasks automatically, and keep workloads balanced — all in one elegant dashboard.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 items-center">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-lg text-white font-semibold shadow-md"
                  style={{ background: "linear-gradient(90deg,#8FABD4,#6FA8D6)" }}
                  aria-label="Get started — sign up"
                >
                  Get started
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>

                <a
                  href="#features"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E6E9EB] text-[#4A4A4A] hover:border-[#8FABD4] hover:text-[#8FABD4] transition"
                >
                  Learn more
                </a>
              </div>

              {/* Feature list */}
              <ul id="features" className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 max-w-md">
                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-md bg-white border border-[#E6E9EB] flex items-center justify-center text-[#8FABD4]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#8FABD4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <div className="font-medium text-[#1F2937]">Smart assignments</div>
                    <div className="text-sm text-[#6B7280]">Auto-assign tasks to the least loaded teammate.</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-md bg-white border border-[#E6E9EB] flex items-center justify-center text-[#8FABD4]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#8FABD4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18" /></svg>
                  </div>
                  <div>
                    <div className="font-medium text-[#1F2937]">Projects & tasks</div>
                    <div className="text-sm text-[#6B7280]">Organize work by project, team, and priority.</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-md bg-white border border-[#E6E9EB] flex items-center justify-center text-[#8FABD4]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#8FABD4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" /></svg>
                  </div>
                  <div>
                    <div className="font-medium text-[#1F2937]">Track progress</div>
                    <div className="text-sm text-[#6B7280]">Status, priority, and capacity at a glance.</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-md bg-white border border-[#E6E9EB] flex items-center justify-center text-[#8FABD4]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="#8FABD4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3" /></svg>
                  </div>
                  <div>
                    <div className="font-medium text-[#1F2937]">Team insights</div>
                    <div className="text-sm text-[#6B7280]">See who's overloaded and rebalance with one click.</div>
                  </div>
                </li>
              </ul>

              {/* small trust / testimonial */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <div className="text-sm text-[#6B7280]">Trusted by growing teams</div>
                <div className="bg-white border border-[#E6E9EB] rounded-lg px-3 py-2 shadow-sm">
                  <div className="text-sm font-medium text-[#1F2937]">“Task Manager cut our planning time in half.”</div>
                  <div className="text-xs text-[#6B7280]">— A. Ahmed, Product Lead</div>
                </div>
              </div>
            </div>

            {/* Right: mockup / illustration */}
            <div className="relative flex items-center justify-center">
              <div className="hidden lg:block absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-[#8FABD4]/8 blur-2xl"></div>

              <div className="w-full max-w-md rounded-2xl shadow-2xl border border-[#E6E9EB] overflow-hidden transform hover:scale-[1.01] transition">
                {/* Replace bg with an actual screenshot or illustration */}
                <div className="bg-gradient-to-br from-white to-[#FBFDFF] p-6">
                  <div className="h-48 bg-[#F7F9FA] rounded-lg border border-[#E6E9EB] flex items-center justify-center text-sm text-[#6B7280]">
                    Dashboard screenshot placeholder
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="p-3 bg-white rounded-lg border border-[#E6E9EB] text-center text-xs">Projects</div>
                    <div className="p-3 bg-white rounded-lg border border-[#E6E9EB] text-center text-xs">Tasks</div>
                    <div className="p-3 bg-white rounded-lg border border-[#E6E9EB] text-center text-xs">Teams</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom badges */}
          <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-[#6B7280]">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-white border border-[#E6E9EB] flex items-center justify-center text-[#8FABD4] shadow-sm">✓</span>
              <span>99.9% uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-white border border-[#E6E9EB] flex items-center justify-center text-[#8FABD4] shadow-sm">🔒</span>
              <span>Secure by default</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-white border border-[#E6E9EB] flex items-center justify-center text-[#8FABD4] shadow-sm">⚡</span>
              <span>Fast & lightweight</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
