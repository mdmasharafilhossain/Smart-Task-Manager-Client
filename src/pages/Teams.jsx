/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import api from "../utils/api.js";
import Loader from "../components/Shared/Loader.jsx";

export default function Teams() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { register: regM, handleSubmit: handleMember, reset: resetM, formState: { errors: errorsM } } = useForm();
  const [teams, setTeams] = useState([]);
const [loading, setLoading] = useState(true);
  const load = async () => {
    try {
        const { data } = await api.get("/teams");
    setTeams(data);
    } catch (error) {
        console.error("Failed to load teams", error);
    }finally {
        setLoading(false);
    }
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
if(loading) return <Loader/>;
  return (
    <div className="space-y-6 p-4">
      {/* Create Team Card */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#8FABD4]/10">
        <h1 className="text-lg font-semibold mb-3 text-[#1F2937]">Create Team</h1>

        <form onSubmit={handleSubmit(onCreateTeam)} className="flex flex-col md:flex-row gap-3 items-start">
          <div className="flex-1 w-full">
            <input
              className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FABD4]/30 ${errors.name ? "border-red-400" : "border-[#E6E9EB]"}`}
              placeholder="Team name"
              {...register("name", { required: "Team name is required" })}
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-linear-to-r from-[#8FABD4] to-[#6FA8D6] text-white rounded-lg shadow-sm"
          >
            Create
          </button>
        </form>
      </div>

      {/* Teams List */}
      {teams.map(t => (
        <div key={t._id} className="bg-white p-5 rounded-2xl shadow-sm border border-[#8FABD4]/10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-[#1F2937]">Team Name: {t.name}</h2>
            <div className="text-sm text-[#4A4A4A]">Members: {t.members?.length || 0}</div>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mb-4">
            {t.members && t.members.length ? (
              t.members.map(m => (
                <div key={m._id} className="border rounded-lg p-3 bg-white">
                  <div className="font-medium text-[#1F2937]">{m.name}</div>
                  <div className="text-sm text-[#4A4A4A]">{m.role}</div>
                  <div className="text-sm text-[#4A4A4A]">Capacity: {m.capacity}</div>
                </div>
              ))
            ) : (
              <div className="text-sm text-[#4A4A4A]">No members yet</div>
            )}
          </div>

          <div>
            <h3 className="font-medium mb-3 text-[#1F2937]">Add Member</h3>

            <form onSubmit={handleMember((values) => onAddMember(t._id, values))} className="grid md:grid-cols-4 gap-3 items-end">
              <div>
                <input
                  className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FABD4]/30 ${errorsM.name ? "border-red-400" : "border-[#E6E9EB]"}`}
                  placeholder="Name"
                  {...regM("name", { required: "Member name is required" })}
                />
                {errorsM.name && <p className="text-red-600 text-sm mt-1">{errorsM.name.message}</p>}
              </div>

              <div>
                <input
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FABD4]/30 border-[#E6E9EB]"
                  placeholder="Role (optional)"
                  {...regM("role")}
                />
                {errorsM.role && <p className="text-red-600 text-sm mt-1">{errorsM.role.message}</p>}
              </div>

              <div>
                <input
                  type="number"
                  min="0"
                  max="5"
                  className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FABD4]/30 ${errorsM.capacity ? "border-red-400" : "border-[#E6E9EB]"}`}
                  placeholder="Capacity (0-5)"
                  {...regM("capacity", {
                    validate: v => (v === "" || (Number(v) >= 0 && Number(v) <= 5)) || "Capacity must be between 0 and 5"
                  })}
                />
                {errorsM.capacity && <p className="text-red-600 text-sm mt-1">{errorsM.capacity.message}</p>}
              </div>

              <div>
                <button className="w-full py-2 bg-linear-to-r from-[#8FABD4] to-[#6FA8D6] text-white rounded-lg shadow-sm">Add</button>
              </div>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}
