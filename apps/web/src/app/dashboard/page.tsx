"use client";

import React from "react";
import { useSession } from "@/lib/auth-client";

function page() {
  const { data: session, isPending, error } = useSession();

  if (isPending) {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold text-red-600 mb-4">Session Error</h2>
        <p className="text-red-500 mb-2">Error: {error.message}</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold text-yellow-600 mb-4">
          Not Authenticated
        </h2>
        <p>Please sign in to access the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="bg-black text-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">User Information</h2>

        <div className="space-y-3">
          <div>
            <span className="font-medium">ID:</span> {session.user.id}
          </div>

          <div>
            <span className="font-medium">Email:</span> {session.user.email}
          </div>

          {session.user.name && (
            <div>
              <span className="font-medium">Name:</span> {session.user.name}
            </div>
          )}

          {session.user.image && (
            <div>
              <span className="font-medium">Avatar:</span>
              <img
                src={session.user.image}
                alt="Profile"
                className="w-10 h-10 rounded-full ml-2 inline-block"
              />
            </div>
          )}

          <div>
            <span className="font-medium">Email Verified:</span>{" "}
            {session.user.emailVerified ? "Yes" : "No"}
          </div>

          <div>
            <span className="font-medium">Created At:</span>{" "}
            {new Date(session.user.createdAt).toLocaleString()}
          </div>

          <div>
            <span className="font-medium">Updated At:</span>{" "}
            {new Date(session.user.updatedAt).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
