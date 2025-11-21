/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import api from "../utils/api";

export default function Teams() {
  const { register, handleSubmit, reset } = useForm();
  const { register: regM, handleSubmit: handleMember, reset: resetM } = useForm();
  const [teams, setTeams] = useState([]);

  const load = async () => {
    const { data } = await api.get("/teams");
    setTeams(data);
  };
  useEffect(() => { load(); }, []);

  const onCreateTeam = async (values) => {
    if (!values.name) return;
    const { data } = await api.post("/teams", values);
    reset();
    await load();
    Swal.fire("Created", `Team "${data.name}" created`, "success");
  };

  const onAddMember = async (teamId, values) => {
    const payload = { name: values.name, role: values.role, capacity: Number(values.capacity || 3) };
    const { data } = await api.post(`/teams/${teamId}/members`, payload);
    resetM();
    await load();
    Swal.fire("Added", `Member "${data.name}" added`, "success");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <h1 className="text-lg font-semibold mb-3">Create Team</h1>
        <form onSubmit={handleSubmit(onCreateTeam)} className="flex flex-col md:flex-row gap-2">
          <input className="border px-3 py-2 rounded w-full md:w-80" placeholder="Team name" {...register("name")} />
          <button className="px-4 py-2 bg-slate-900 text-white rounded">Create</button>
        </form>
      </div>

      {teams.map(t => (
        <div key={t._id} className="bg-white p-4 rounded-xl shadow">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">{t.name}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-2">
            {t.members.map(m => (
              <div key={m._id} className="border rounded p-2">
                <div className="font-medium">{m.name}</div>
                <div className="text-sm text-slate-600">{m.role}</div>
                <div className="text-sm">Capacity: {m.capacity}</div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h3 className="font-medium mb-2">Add Member</h3>
            <form onSubmit={handleMember(onAddMember.bind(null, t._id))} className="grid md:grid-cols-4 gap-2">
              <input className="border px-3 py-2 rounded" placeholder="Name" {...regM("name", { required: true })} />
              <input className="border px-3 py-2 rounded" placeholder="Role" {...regM("role")} />
              <input className="border px-3 py-2 rounded" type="number" min="0" max="5" placeholder="Capacity (0-5)" {...regM("capacity")} />
              <button className="px-4 py-2 bg-slate-900 text-white rounded">Add</button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
