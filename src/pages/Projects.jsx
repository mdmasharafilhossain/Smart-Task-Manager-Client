/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../utils/api";
import Swal from "sweetalert2";


export default function Projects() {
  const { register, handleSubmit, reset } = useForm();
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
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <h1 className="text-lg font-semibold mb-3">Create Project</h1>
        <form onSubmit={handleSubmit(onCreate)} className="grid md:grid-cols-3 gap-2">
          <input className="border px-3 py-2 rounded" placeholder="Project name" {...register("name", { required: true })} />
          <select className="border px-3 py-2 rounded" {...register("teamId", { required: true })}>
            <option value="">Select team</option>
            {teams.map(t => <option key={t._id} value={t.name}>{t.name}</option>)}
          </select>
          <button className="px-4 py-2 bg-slate-900 text-white rounded">Create</button>
        </form>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">My Projects</h2>
        <div className="grid md:grid-cols-3 gap-2">
          {projects.map(p => (
            <div key={p._id} className="border rounded p-3">
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-slate-600">Team: {p.teamId}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
