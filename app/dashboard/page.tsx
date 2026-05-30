// app/dashboard/page.tsx

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type UserProfile = {
  id: string;
  age: number;
  height_cm: number;
  weight_kg: number;
  sex: string;
  goal: string;
  activity_level: string;
  meals_per_day: number;
};

export default function DashboardPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        return;
      }

      setEmail(userData.user.email ?? null);

      const { data: profileData, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userData.user.id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setProfile(profileData);
    }

    loadDashboard();
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <p className="mb-6">
        Logged in as: {email}
      </p>

      {profile && (
        <div className="border rounded p-4 space-y-2">
          <p>Weight: {profile.weight_kg} kg</p>
          <p>Height: {profile.height_cm} cm</p>
          <p>Goal: {profile.goal}</p>
          <p>Activity: {profile.activity_level}</p>
          <p>Meals Per Day: {profile.meals_per_day}</p>
        </div>
      )}
    </main>
  );
}