/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import api from "../utils/api";
import Loader from "../components/shared/Loader";


export default function Tasks() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { priority: "Medium", status: "Pending" }});
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]); 
  const [filters, setFilters] = useState({ projectId: "", assigneeId: "" });
  const [loading, setLoading] = useState(true); 
  const [membersLoading, setMembersLoading] = useState(false); 

  const chosenProject = watch("projectId");

  const loadProjects = async () => {
    const { data } = await api.get("/projects");
    setProjects(data);
  };
  const loadTasks = async () => {
    const params = {};
    if (filters.projectId) params.projectId = filters.projectId;
    if (filters.assigneeId) params.assigneeId = filters.assigneeId;
    const { data } = await api.get("/tasks", { params });
    setTasks(data);
  };
  const loadMemberLoads = async (projectId) => {
    if (!projectId) { setMembers([]); return; }
    try {
      setMembersLoading(true);
      const { data } = await api.get(`/tasks/member-loads/${projectId}`);
      setMembers(data);
    } finally {
      setMembersLoading(false);
    }
  };


  const loadAll = async () => {
    setLoading(true);
    try {
      const t = await api.get("/projects");
      setProjects(t.data || []);
      const tasksRes = await api.get("/tasks");
      setTasks(tasksRes.data || []);
    } catch (e) {
      Swal.fire("Error", "Failed to load initial data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);
  useEffect(() => { loadTasks(); }, [filters]);
  useEffect(() => { loadMemberLoads(chosenProject); }, [chosenProject]);

  const onCreate = async (values) => {
    try {
      const autoAssign = values.assigneeId === "__AUTO__";
      const payload = {
        ...values,
        autoAssign,
        assigneeId: values.assigneeId && values.assigneeId !== "__AUTO__" ? values.assigneeId : null,
      };
      const { data } = await api.post("/tasks", payload);

      
      if (!autoAssign && payload.assigneeId) {
        const m = members.find(x => x.memberId === payload.assigneeId);
        if (m && m.load + 1 > m.capacity) {
          const res = await Swal.fire({
            title: `${m.name} has ${m.load} tasks but capacity is ${m.capacity}. Assign anyway?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Assign Anyway",
            cancelButtonText: "Choose Another"
          });
          if (!res.isConfirmed) {
         
            await api.delete(`/tasks/${data._id}`);
            return;
          }
        }
      }

      reset({ title: "", description: "", projectId: values.projectId, assigneeId: "", priority: "Medium", status: "Pending" });
      await loadTasks();
      await loadMemberLoads(values.projectId);
      Swal.fire("Created", "Task added", "success");
    } catch (e) {
      Swal.fire("Error", e?.response?.data?.message || "Failed", "error");
    }
  };

  const priorities = ["Low", "Medium", "High"];
  const statuses = ["Pending", "In Progress", "Done"];

  
  if (loading) return <Loader />;

  return (
    <div className="space-y-6 p-4">
      
      <div className="bg-white p-6 rounded-2xl shadow-md border border-[#8FABD4]/10">
        <h1 className="text-lg font-semibold mb-4 text-[#1F2937]">Add Task</h1>

        <form onSubmit={handleSubmit(onCreate)} className="grid md:grid-cols-6 gap-3">
          <div className="md:col-span-2">
            <label className="block text-sm text-[#4A4A4A] mb-1">Project</label>
            <select
              className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FABD4]/30 ${errors.projectId ? "border-red-400" : "border-[#E6E9EB]"}`}
              {...register("projectId", { required: "Project is required" })}
            >
              <option value="">Select Project</option>
              {projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
            </select>
            {errors.projectId && <p className="text-red-600 text-sm mt-1">{errors.projectId.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-[#4A4A4A] mb-1">Title</label>
            <input
              className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FABD4]/30 ${errors.title ? "border-red-400" : "border-[#E6E9EB]"}`}
              placeholder="Title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-[#4A4A4A] mb-1">Priority</label>
            <select className="w-full border px-3 py-2 rounded-lg" {...register("priority")}>
              {priorities.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm text-[#4A4A4A] mb-1">Status</label>
            <select className="w-full border px-3 py-2 rounded-lg" {...register("status")}>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm text-[#4A4A4A] mb-1">Description</label>
            <textarea className="w-full border px-3 py-2 rounded-lg min-h-20 focus:outline-none focus:ring-2 focus:ring-[#8FABD4]/30" placeholder="Description" {...register("description")}></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-[#4A4A4A] mb-1">Assignee</label>
            <div className="relative">
              <select className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FABD4]/30" {...register("assigneeId")}>
                <option value="">Unassigned</option>
                <option value="__AUTO__">Auto-assign (least load)</option>
                {members.map(m => (
                  <option key={m.memberId} value={m.memberId}>
                    {m.name} ({m.load}/{m.capacity})
                  </option>
                ))}
              </select>
              {membersLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#4A4A4A]">loading...</div>
              )}
            </div>
          </div>

          <div className="md:col-span-1 flex items-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 rounded-lg text-white font-medium shadow-sm"
              style={{ background: 'linear-gradient(90deg,#8FABD4,#6FA8D6)' }}
            >
              {isSubmitting ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md border border-[#8FABD4]/10">
        <h2 className="text-lg font-semibold mb-3 text-[#1F2937]">Filter</h2>
        <div className="grid md:grid-cols-4 gap-3">
          <select
            className="border px-3 py-2 rounded-lg"
            value={filters.projectId}
            onChange={e => setFilters(f => ({ ...f, projectId: e.target.value }))}
          >
            <option value="">All Projects</option>
            {projects.map(p => <option key={p._id} value={p._1d}>{p.name}</option>)}
          </select>

          <select
            className="border px-3 py-2 rounded-lg"
            value={filters.assigneeId}
            onChange={e => setFilters(f => ({ ...f, assigneeId: e.target.value }))}
          >
            <option value="">All Members</option>
            <option value="Unassigned">Unassigned</option>
            {members.map(m => <option key={m.memberId} value={m.memberId}>{m.name}</option>)}
          </select>

          <div className="md:col-span-2 flex items-center gap-3">
            <button
              className="px-4 py-2 rounded-lg bg-white border border-[#E6E9EB] text-[#4A4A4A]"
              onClick={() => setFilters({ projectId: "", assigneeId: "" })}
            >
              Reset
            </button>
            <div className="text-sm text-[#6B7280]">Showing {tasks.length} tasks</div>
          </div>
        </div>
      </div>

      
<div className="bg-white p-6 rounded-2xl shadow-md border border-[#8FABD4]/10">
  <h2 className="text-lg font-semibold mb-3 text-[#1F2937]">Tasks</h2>

 
  <div className="hidden md:block overflow-x-auto">
    <table className="w-full text-sm table-auto">
      <thead>
        <tr className="text-left border-b text-[#6B7280]">
          <th className="p-3 font-medium">Title</th>
          <th className="p-3 font-medium w-28">Priority</th>
          <th className="p-3 font-medium w-32">Status</th>
          <th className="p-3 font-medium">Assignee</th>
          <th className="p-3 font-medium w-48">Actions</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((t, idx) => (
          <tr key={t._id} className={`${idx % 2 === 0 ? "bg-white" : "bg-[#FBFDFF]"} border-b`}>
            <td className="p-3 align-top">{t.title}</td>

            
            <td className="p-3 align-top">
              <span
                className={
                  "inline-block px-3 py-1 rounded-full text-xs font-medium " +
                  (t.priority === "High"
                    ? "bg-red-100 text-red-700"
                    : t.priority === "Low"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-800")
                }
              >
                {t.priority}
              </span>
            </td>

        
            <td className="p-3 align-top">
              <span
                className={
                  "inline-block px-3 py-1 rounded-full text-xs font-medium " +
                  (t.status === "Done"
                    ? "bg-green-50 text-green-700"
                    : t.status === "In Progress"
                    ? "bg-blue-50 text-blue-700"
                    : "bg-gray-50 text-gray-700")
                }
              >
                {t.status}
              </span>
            </td>

            <td className="p-3 align-top">
              {t.assigneeId ? (members.find(m => m.memberId === t.assigneeId)?.name || t.assigneeId) : "Unassigned"}
            </td>

         
              <td className="p-3 align-top">
              <div className="flex gap-2">
                <button
                  className="flex items-center gap-2 px-3 py-1 rounded border hover:shadow-sm text-sm"
                  onClick={async () => {
                    const res = await Swal.fire({
                      input: "select",
                      inputOptions: {
                        "": "Unassigned",
                        ...Object.fromEntries(members.map(m => [m.memberId, `${m.name} (${m.load}/${m.capacity})`]))
                      },
                      inputPlaceholder: "Select assignee",
                      showCancelButton: true
                    });
                    if (!res.isConfirmed) return;
                    await api.put(`/tasks/${t._id}`, { assigneeId: res.value === "" ? null : res.value });
                    await loadTasks();
                    Swal.fire("Success", "Assignee updated", "success");
                  }}
                >
           
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A5 5 0 0112 15a5 5 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span>Reassign</span>
                </button>

                <button
                  className="flex items-center gap-2 px-3 py-1 rounded border hover:shadow-sm text-sm"
                  onClick={async () => {
                    const res = await Swal.fire({
                      input: "select",
                      inputOptions: { Pending: "Pending", "In Progress": "In Progress", Done: "Done" },
                      inputValue: t.status,
                      showCancelButton: true
                    });
                    if (!res.isConfirmed) return;
                    await api.put(`/tasks/${t._id}`, { status: res.value });
                    await loadTasks();
                    Swal.fire("Success", "Status updated", "success");
                  }}
                >
                 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" /></svg>
                  <span>Status</span>
                </button>

                <button
                  className="flex items-center gap-2 px-3 py-1 rounded border text-red-600 hover:bg-red-50 text-sm"
                  onClick={async () => {
                    const { isConfirmed } = await Swal.fire({ title: "Delete?", icon: "warning", showCancelButton: true });
                    if (!isConfirmed) return;
                    await api.delete(`/tasks/${t._id}`);
                    await loadTasks();
                    Swal.fire("Deleted", "Task removed", "success");
                  }}
                >
               
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7L5 7M10 11v6M14 11v6M9 7l1-3h4l1 3" /></svg>
                  <span>Delete</span>
                </button>
              </div>
            </td>
          </tr>
        ))}

        {tasks.length === 0 && (
          <tr>
            <td colSpan="5" className="p-4 text-center text-slate-500">No tasks</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>


  <div className="md:hidden space-y-3">
    {tasks.length === 0 && (
      <div className="p-4 text-center text-slate-500">No tasks</div>
    )}

    {tasks.map(t => (
      <div key={t._id} className="border rounded-lg p-4 bg-white shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-medium text-[#1F2937]">{t.title}</div>
            <div className="text-sm text-[#4A4A4A] mt-1">Assignee: {t.assigneeId ? (members.find(m => m.memberId === t.assigneeId)?.name || t.assigneeId) : "Unassigned"}</div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className={
              "px-2 py-1 rounded-full text-xs font-medium " +
              (t.priority === "High" ? "bg-red-100 text-red-700" : t.priority === "Low" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-800")
            }>
              {t.priority}
            </span>

            <span className={
              "px-2 py-1 rounded-full text-xs font-medium " +
              (t.status === "Done" ? "bg-green-50 text-green-700" : t.status === "In Progress" ? "bg-blue-50 text-blue-700" : "bg-gray-50 text-gray-700")
            }>
              {t.status}
            </span>
          </div>
        </div>

      
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            className="flex items-center gap-2 px-3 py-1 rounded border text-sm"
            onClick={async () => {
              const res = await Swal.fire({
                input: "select",
                inputOptions: {
                  "": "Unassigned",
                  ...Object.fromEntries(members.map(m => [m.memberId, `${m.name} (${m.load}/${m.capacity})`]))
                },
                inputPlaceholder: "Select assignee",
                showCancelButton: true
              });
              if (!res.isConfirmed) return;
              await api.put(`/tasks/${t._id}`, { assigneeId: res.value === "" ? null : res.value });
              await loadTasks();
            }}
          >
            Reassign
          </button>

          <button
            className="flex items-center gap-2 px-3 py-1 rounded border text-sm"
            onClick={async () => {
              const res = await Swal.fire({
                input: "select",
                inputOptions: { Pending: "Pending", "In Progress": "In Progress", Done: "Done" },
                inputValue: t.status,
                showCancelButton: true
              });
              if (!res.isConfirmed) return;
              await api.put(`/tasks/${t._id}`, { status: res.value });
              await loadTasks();
            }}
          >
            Status
          </button>

          <button
            className="flex items-center gap-2 px-3 py-1 rounded border text-red-600 text-sm"
            onClick={async () => {
              const { isConfirmed } = await Swal.fire({ title: "Delete?", icon: "warning", showCancelButton: true });
              if (!isConfirmed) return;
              await api.delete(`/tasks/${t._id}`);
              await loadTasks();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
}
