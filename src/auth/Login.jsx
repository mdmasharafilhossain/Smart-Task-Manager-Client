import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";

import { Link, useNavigate } from "react-router";
import api from "../utils/api";
import { AuthContext } from "./AuthContext";

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await api.post("/auth/login", values);
      login(data);
      Swal.fire("Welcome", "Login successful", "success");
      navigate("/dashboard");
    } catch (e) {
      Swal.fire("Error", e?.response?.data?.message || "Login failed", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="block mb-1">Email</label>
          <input className="w-full border px-3 py-2 rounded"
            {...register("email", { required: "Email is required" })}/>
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input type="password" className="w-full border px-3 py-2 rounded"
            {...register("password", { required: "Password is required" })}/>
          {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
        </div>
        <button disabled={isSubmitting} className="w-full py-2 bg-slate-900 text-white rounded">
          {isSubmitting ? "Signing in..." : "Login"}
        </button>
        <p className="text-sm">No account? <Link className="underline" to="/register">Register</Link></p>
      </form>
    </div>
  );
}
