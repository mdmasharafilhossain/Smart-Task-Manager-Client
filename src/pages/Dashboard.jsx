import  { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../utils/api";
import Loader from "../components/shared/Loader";


export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/dashboard");
      setData(data);
    } catch (e) {
      console.error(e);
      Swal.fire("Error", "Failed to load dashboard", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const reassign = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Reassign Tasks?",
      text: "This will rebalance low/medium tasks across your teams.",
      icon: "question",
      showCancelButton: true
    });
    if (!isConfirmed) return;
    const res = await api.post("/dashboard/reassign");
    console.log(res.data , "Data");
    await load();
    Swal.fire("Done", `${res.data.moves.length} tasks moved (showing last 5).`, "success");
  };

  if (loading) return <Loader />;

  if (!data) return (
    <div className="min-h-[300px] flex items-center justify-center text-sm text-[#6B7280]">
      No data available.
    </div>
  );

  return (
    <div className="space-y-6 p-4">
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow border border-[#8FABD4]/8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#8FABD4]/20 flex items-center justify-center text-xl font-bold text-[#285e7a]">
        
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#285e7a"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6" /></svg>
          </div>
          <div>
            <div className="text-sm text-[#6B7280]">Total Projects</div>
            <div className="text-2xl font-bold text-[#1F2937]">{data.totalProjects}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow border border-[#8FABD4]/8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#8FABD4]/20 flex items-center justify-center text-xl font-bold text-[#285e7a]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#285e7a"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6" /></svg>
          </div>
          <div>
            <div className="text-sm text-[#6B7280]">Total Tasks</div>
            <div className="text-2xl font-bold text-[#1F2937]">{data.totalTasks}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow border border-[#8FABD4]/8 flex items-center gap-4 col-span-1 sm:col-span-2 lg:col-span-1">
          <div className="flex-1">
            <div className="text-sm text-[#6B7280]">Load Balancer</div>
            <div className="font-semibold text-[#1F2937]">Reassign Tasks</div>
            <div className="text-xs text-[#6B7280] mt-1">Balance workload across team members</div>
          </div>
          <div>
            <button
              onClick={reassign}
              className="px-4 py-2 rounded-lg text-white font-medium shadow-sm"
              style={{ background: "linear-gradient(90deg,#8FABD4,#6FA8D6)" }}
            >
              Reassign
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow border border-[#8FABD4]/8 flex items-center gap-4">
          <div className="flex-1">
            <div className="text-sm text-[#6B7280]">Last Reassign</div>
            <div className="text-base font-medium text-[#1F2937]">{data.lastReassignAt ? new Date(data.lastReassignAt).toLocaleString() : "Never"}</div>
          </div>
        </div>
      </div>

      
      <div className="bg-white p-6 rounded-2xl shadow border border-[#8FABD4]/10">
        <h2 className="text-lg font-semibold mb-4 text-[#1F2937]">Team Summary</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.teams.map((t) => (
            <div key={t.teamId} className="p-4 rounded-lg border border-[#E6E9EB]">
              <div className="flex items-center justify-between mb-3">
                <div className="font-medium text-[#1F2937]">{t.teamName}</div>
                <div className="text-sm text-[#6B7280]">{t.members.length} members</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {t.members.map((m) => {
                  const overloaded = m.load > m.capacity;
                  return (
                    <div
                      key={m.memberId}
                      className={`p-3 rounded-lg flex items-center justify-between ${
                        overloaded ? "bg-red-50 border-red-200" : "bg-white border border-[#E6E9EB]"
                      }`}
                    >
                      <div>
                        <div className="font-medium text-[#1F2937]">{m.name}</div>
                        <div className="text-xs text-[#6B7280]">{m.role || "Member"}</div>
                      </div>
                      <div className="text-sm">
                        <div className={`${overloaded ? "text-red-600 font-semibold" : "text-[#4A4A4A]"}`}>
                          {m.load}/{m.capacity}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

     
      <div className="bg-white p-6 rounded-2xl shadow border border-[#8FABD4]/10">
        <h2 className="text-lg font-semibold mb-3 text-[#1F2937]">Recent Reassignments</h2>
        <ul className="space-y-2">
          {data.recentLogs && data.recentLogs.length ? (
            data.recentLogs.map((l) => (
              <li key={l._id} className="text-sm text-[#4A4A4A]">
                {l.message}
              </li>
            ))
          ) : (
            <li className="text-sm text-[#6B7280]">No recent reassignments</li>
          )}
        </ul>
      </div>
    </div>
  );
}
