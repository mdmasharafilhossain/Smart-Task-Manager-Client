import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import api from "../utils/api";
import { AuthContext } from "./AuthContext";
import { Eye, EyeOff } from "lucide-react";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (Userdata) => {
    try {
      const { data } = await api.post("/auth/login", Userdata);
      login(data);
      Swal.fire("Welcome", "Login successful", "success");
      navigate("/dashboard");
    } catch (e) {
      Swal.fire("Error", e?.response?.data?.message || "Login failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#d4d4d3] p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-[#8FABD4]/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-[#8FABD4] flex items-center justify-center text-white font-bold">TM</div>
          <div>
            <h1 className="text-2xl font-semibold text-[#1F2937]">Welcome back</h1>
            <p className="text-sm text-[#4A4A4A]">Sign in to your account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A] mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border border-[#E6E9EB] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FABD4]/40"
              placeholder="you@company.com"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4A4A4A] mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full border border-[#E6E9EB] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FABD4]/40"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* <div className="flex items-center justify-between">
            <label className="inline-flex items-center gap-2 text-sm text-[#4A4A4A]">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
              Remember me
            </label>
            <Link to="/forgot" className="text-sm underline text-[#4A4A4A]">Forgot?</Link>
          </div> */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg transition-shadow disabled:opacity-60"
            style={{ background: "linear-gradient(90deg,#8FABD4,#6FA8D6)", color: "white" }}
          >
            {isSubmitting ? (
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.25" strokeWidth="4"></circle>
                <path d="M22 12a10 10 0 00-10-10" stroke="white" strokeWidth="4" strokeLinecap="round"></path>
              </svg>
            ) : null}
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-center text-sm text-[#4A4A4A]">
            Don’t have an account? <Link to="/register" className="font-medium underline text-[#8FABD4]">Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
