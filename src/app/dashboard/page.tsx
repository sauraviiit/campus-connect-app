"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import QuickConnections from '@/components/dashboard/QuickConnections';
import RecentInteractions from '@/components/dashboard/RecentInteractions';

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      const storedUser = localStorage.getItem('currentUser');
      if (!storedUser) {
        router.push('/');
      }
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated && !localStorage.getItem('currentUser')) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-8 mt-16">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || 'User'}! 👋</h1>
              <p className="text-gray-500 mt-1">Here's what's happening in your network today.</p>
            </div>

            <QuickConnections />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-3 space-y-8">
                <RecentInteractions />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
