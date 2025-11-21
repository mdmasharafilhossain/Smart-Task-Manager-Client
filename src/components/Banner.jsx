import { Link, NavLink } from "react-router";
 const bgImage = "sandbox:/mnt/data/a116ffb8-7562-4aa9-8197-4db9843c00f9.png";
export default function Banner() {
  return (
    <header className="bg-[#EFECE3] min-h-screen">
   <div className="w-full max-w-xl mx-auto border-t border-[#8FABD4]/20 mt-0.5"></div>
      <div className="relative overflow-hidden">
        <div className="absolute -left-40 -top-24 w-80 h-80 rounded-full bg-[#8FABD4]/10 blur-3xl animate-blob"></div>
        <div className="absolute right-0 -top-16 w-64 h-64 rounded-full bg-[#8FABD4]/8 blur-2xl animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
        
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

             
              <div className="flex flex-wrap gap-3 items-center">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-lg text-white font-semibold shadow-md"
                  style={{ background: "linear-gradient(90deg,#8FABD4,#6FA8D6)" }}
                  aria-label="Get started — sign up"
                >
                  Get started
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>

               
              </div>

            
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

         
              <div className="mt-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <div className="text-sm text-[#6B7280]">Trusted by growing teams</div>
                <div className="bg-white border border-[#E6E9EB] rounded-lg px-3 py-2 shadow-sm">
                  <div className="text-sm font-medium text-[#1F2937]">“Task Manager cut our planning time in half.”</div>
                  <div className="text-xs text-[#6B7280]">--- MD.Mashrafil, Product Lead</div>
                </div>
              </div>
            </div>

          
            <div className="relative flex items-center justify-center py-6">
     
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-30 filter blur-xl scale-105"
        style={{ mixBlendMode: "lighten" }}
      />

     
      <div className="pointer-events-none absolute -left-10 -top-8 w-44 h-44 rounded-full bg-[#8FABD4]/10 blur-3xl animate-blob"></div>
      <div className="pointer-events-none absolute right-0 top-10 w-36 h-36 rounded-full bg-[#8FABD4]/8 blur-2xl animate-blob animation-delay-2000"></div>

    
      <div className="relative w-full max-w-lg transform transition-transform hover:-translate-y-1 hover:scale-[1.01]">
        <div className="rounded-2xl shadow-2xl border border-[#E6E9EB] overflow-hidden bg-white">
        
          <div className="flex items-center justify-between px-4 py-3 bg-white/80 border-b border-[#EEF2F4]">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#FC5C65] shadow-sm"></span>
              <span className="w-3 h-3 rounded-full bg-[#F5C84C] shadow-sm"></span>
              <span className="w-3 h-3 rounded-full bg-[#6ACB64] shadow-sm"></span>
              <div className="ml-3 text-xs text-[#6B7280]">Preview</div>
            </div>
            <div className="text-xs text-[#9CA3AF]">task-manager.local</div>
          </div>

          
          <div className="p-6 bg-linear-to-br from-white to-[#FBFDFF]">
       
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-[#6B7280]">Overview</div>
                <div className="text-xl font-semibold text-[#1F2937]">Team workload</div>
              </div>
              <div className="text-xs text-[#6B7280]">Updated now</div>
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
              <div className="md:col-span-2 bg-[#F7FAFC] rounded-lg border border-[#EEF2F4] p-3">
                <div className="h-28 rounded-md bg-linear-to-r from-[#EFF6FF] to-[#F7FBFF] shadow-inner flex items-end gap-1 px-2">
                 
                  <div className="w-8 h-12 rounded-t bg-[#8FABD4] opacity-90" />
                  <div className="w-6 h-20 rounded-t bg-[#6FA8D6]" />
                  <div className="w-6 h-10 rounded-t bg-[#8FABD4]/80" />
                  <div className="w-8 h-16 rounded-t bg-[#6FA8D6]/90" />
                  <div className="w-6 h-8 rounded-t bg-[#8FABD4]/60" />
                </div>
                <div className="mt-3 flex gap-3">
                  <div className="flex-1 bg-white rounded-lg border border-[#E6E9EB] p-2 text-xs text-center">Active projects</div>
                  <div className="flex-1 bg-white rounded-lg border border-[#E6E9EB] p-2 text-xs text-center">Open tasks</div>
                </div>
              </div>

             
              <div className="space-y-3">
                <div className="bg-white rounded-lg border border-[#E6E9EB] p-3 text-sm">
                  <div className="text-xs text-[#6B7280]">Members</div>
                  <div className="font-medium text-[#1F2937]">12</div>
                </div>
                <div className="bg-white rounded-lg border border-[#E6E9EB] p-3 text-sm">
                  <div className="text-xs text-[#6B7280]">Capacity</div>
                  <div className="font-medium text-[#1F2937]">Balanced</div>
                </div>
              </div>
            </div>

 
            <div className="mt-5 grid grid-cols-3 gap-3">
              <button className="p-3 bg-white rounded-lg border border-[#E6E9EB] text-xs font-medium shadow-sm hover:bg-[#FBFDFF]">Projects</button>
              <button className="p-3 bg-white rounded-lg border border-[#E6E9EB] text-xs font-medium shadow-sm hover:bg-[#FBFDFF]">Tasks</button>
              <button className="p-3 bg-white rounded-lg border border-[#E6E9EB] text-xs font-medium shadow-sm hover:bg-[#FBFDFF]">Teams</button>
            </div>
          </div>

     
          <div className="px-6 py-4 border-t border-[#EEF2F4] bg-white/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#8FABD4] rounded-md flex items-center justify-center text-white font-semibold">TM</div>
            
            </div>

            <div className="flex items-center gap-3">
             
              <NavLink to='/dashboard'>  
                <button className="px-3 py-1.5 rounded-lg text-sm text-white" style={{ background: "linear-gradient(90deg,#8FABD4,#6FA8D6)" }}>
                Try it
              </button>
              </NavLink>
            </div>
          </div>
        </div>

        {/* subtle reflection bar */}
        <div className="mt-5 text-center">
          <div className="inline-block w-44 h-1 rounded-full" style={{ background: "linear-gradient(90deg, rgba(143,187,212,0.08), rgba(143,187,212,0.02))" }} />
        </div>
      </div>
    </div>
          </div>

         
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
