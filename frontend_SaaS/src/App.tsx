import React from "react";

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-slate-100">
      {/* Heading rendered with Tailwind utility classes */}
      <h1 className="text-4xl font-bold text-red-600">Tailwind is live 🚀</h1>

      {/* Card demonstrating custom @apply class */}
      <div className="example-box">
        If you can read this, the build pipeline is working!
      </div>

      {/* Button shows hover + focus states */}
      <button className="rounded-md bg-red-600 px-5 py-2 text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">
        Click me
      </button>
    </main>
  );
}
