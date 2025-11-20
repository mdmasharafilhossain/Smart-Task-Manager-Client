import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router";
import api from "../utils/api";
import { AuthContext } from "./AuthContext";
import { Eye, EyeOff } from "lucide-react";
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values) => {
    try {
      const { data } = await api.post("/auth/register", values);
      login(data);
      Swal.fire("Success", "Account created", "success");
      navigate("/dashboard");
    } catch (e) {
      Swal.fire("Error", e?.response?.data?.message || "Registration failed", "error");
    }
  };

  const password = watch("password", "");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#d4d4d3] p-6">
      <div className="w-full max-w-lg bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-[#8FABD4]/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-[#8FABD4] flex items-center justify-center text-white font-bold">
            TM
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-[#1F2937]">Create account</h1>
            
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A] mb-1">Full name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full border border-[#E6E9EB] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FABD4]/40"
              placeholder="MD Mashrafil Hossain"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A] mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
              })}
              className="w-full border border-[#E6E9EB] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FABD4]/40"
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#4A4A4A] mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className="w-full border border-[#E6E9EB] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FABD4]/40"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-[#4A4A4A] hover:text-[#8FABD4]"
              >
                {showPassword ?  <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}

            {password && (
              <p className="text-xs mt-2 text-[#4A4A4A]">
                Password strength:{" "}
                <span className={password.length >= 8 ? "font-medium text-green-600" : "font-medium text-yellow-600"}>
                  {password.length >= 8 ? "Good" : "Weak"}
                </span>
              </p>
            )}
          </div>

          
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
            {isSubmitting ? "Creating..." : "Create account"}
          </button>

          <p className="text-center text-sm text-[#4A4A4A]">
            Already have an account?{" "}
            <Link to="/login" className="font-medium underline text-[#8FABD4]">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
