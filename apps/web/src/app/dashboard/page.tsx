"use client";

import { authClient } from "@/lib/auth-client";

export default function Dashboard() {
  const { data: session } = authClient.useSession();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {session?.user.name}</p>
    </div>
  );
}
