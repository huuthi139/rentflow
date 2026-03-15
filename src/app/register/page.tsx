"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return alert("Passwords don't match");
    setLoading(true);
    setTimeout(() => { window.location.href = "/"; }, 1000);
  };

  const update = (key: string, val: string) => setForm({ ...form, [key]: val });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-primary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="size-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="material-symbols-outlined text-white text-2xl">apartment</span>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-white">RentFlow</h1>
              <p className="text-xs text-slate-400">Property Management</p>
            </div>
          </div>
          <p className="text-slate-400">Create your account to get started</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Create account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">person</span>
                <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  placeholder="John Doe" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">mail</span>
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  placeholder="you@company.com" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">lock</span>
                <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => update("password", e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  placeholder="Min 8 characters" required minLength={8} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <span className="material-symbols-outlined text-lg">{showPassword ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Confirm Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">lock</span>
                <input type="password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                  placeholder="••••••••" required minLength={8} />
              </div>
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" required className="size-4 rounded border-slate-300 text-primary focus:ring-primary mt-0.5" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </span>
            </label>

            <button type="submit" disabled={loading}
              className="w-full py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <><span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>Creating account...</> : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
          </p>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">© 2026 RentFlow. All rights reserved.</p>
      </div>
    </div>
  );
}
