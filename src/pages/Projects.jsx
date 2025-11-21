/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../utils/api";
import Swal from "sweetalert2";

export default function Projects() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  

  const load = async () => {
    const t = await api.get("/teams");
    setTeams(t.data);
    const p = await api.get("/projects");
    setProjects(p.data);
  };

  useEffect(() => { load(); }, []);

  const onCreate = async (values) => {
    try {
      const { data } = await api.post("/projects", values);
      reset();
      await load();
      Swal.fire("Created", `Project "${data.name}" created`, "success");
    } catch (e) {
      Swal.fire("Error", e?.response?.data?.message || "Failed", "error");
    }
  };

  return (
    <div className="space-y-6 p-4">
      {/* Create Project Card */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-[#8FABD4]/10">
        <h1 className="text-lg font-semibold mb-4 text-[#1F2937]">Create Project</h1>

        <form onSubmit={handleSubmit(onCreate)} className="grid md:grid-cols-3 gap-3 items-center">
          <div>
            <input
              className={`w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FABD4]/30 ${errors.name ? 'border-red-400' : 'border-[#E6E9EB]'}`}
              placeholder="Project name"
              {...register("name", { required: "Project name is required" })}
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <select
              className={`w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FABD4]/30 ${errors.teamId ? 'border-red-400' : 'border-[#E6E9EB]'}`}
              {...register("teamId", { required: "Please select a team" })}
            >
              <option value="">Select team</option>
              {teams.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
            </select>
            {errors.teamId && <p className="text-red-600 text-sm mt-1">{errors.teamId.message}</p>}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 rounded-lg text-white font-medium shadow-sm"
              style={{ background: 'linear-gradient(90deg,#8FABD4,#6FA8D6)' }}
            >
              {isSubmitting ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>

      {/* Projects List */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-[#8FABD4]/10">
        <h2 className="text-lg font-semibold mb-4 text-[#1F2937]">My Projects</h2>

        {projects.length === 0 ? (
          <div className="p-6 text-center text-[#4A4A4A]">No projects found. Create your first project.</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {projects.map(p => (
              <div key={p._id} className="border rounded-lg p-4 hover:shadow-lg transition bg-white">
                <div className="font-medium text-[#1F2937]">{p.name}</div>
                <div className="text-sm text-[#4A4A4A] mt-1">Team: {p.teamName || 'N/A'}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
