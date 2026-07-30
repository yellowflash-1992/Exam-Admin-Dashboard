"use client";

import React from 'react';
import Link from 'next/link';

export default function DashboardMainPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Exam Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">Select a section below to get started managing administration logistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/candidates" className="block p-6 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition">
          <h2 className="text-xl font-semibold text-blue-800">Candidates Section →</h2>
          <p className="text-sm text-blue-600 mt-1">View, edit, search, and manage active student enrollment lists.</p>
        </Link>
        
        <Link href="/jamb" className="block p-6 bg-purple-50 border border-purple-100 rounded-xl hover:bg-purple-100 transition">
          <h2 className="text-xl font-semibold text-purple-800">JAMB Metrics →</h2>
          <p className="text-sm text-purple-600 mt-1">Monitor statistics, tracking data, and institutional settings.</p>
        </Link>
      </div>
    </div>
  );
}
