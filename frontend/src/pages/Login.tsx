import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PlaneIcon } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/DashBoard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-section-bg px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">
        {/* logo + heading */}
        <div className="flex flex-col items-center mb-6">
          <div className="rounded-full bg-green-btn p-3 mb-3">
            <PlaneIcon size={22} className="text-white" />
          </div>
          <h1 className="text-xl font-semibold text-green-deep">Owner Login</h1>
          <p className="text-sm text-muted mt-1">Payanam Holidays dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium text-sm text-ink">
              Email
            </label>
            <input
              value={formData.email}
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              onChange={handleChange}
              className="border border-card-border px-3 py-2 rounded-lg focus:border-green-btn focus:ring-1 focus:ring-green-btn focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-medium text-sm text-ink">
              Password
            </label>
            <input
              value={formData.password}
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="border border-card-border px-3 py-2 rounded-lg focus:border-green-btn focus:ring-1 focus:ring-green-btn focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-green-btn text-white py-3 rounded-lg font-semibold w-full hover:bg-green-text active:scale-95 transition-colors mt-2"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
