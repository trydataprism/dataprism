"use client";

import { useEffect, useState } from "react";

const TITLE_TEXT = `
 ██████╗ ███████╗████████╗████████╗███████╗██████╗
 ██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗
 ██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝
 ██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗
 ██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║
 ╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝

 ████████╗    ███████╗████████╗ █████╗  ██████╗██╗  ██╗
 ╚══██╔══╝    ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
    ██║       ███████╗   ██║   ███████║██║     █████╔╝
    ██║       ╚════██║   ██║   ██╔══██║██║     ██╔═██╗
    ██║       ███████║   ██║   ██║  ██║╚██████╗██║  ██╗
    ╚═╝       ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
 `;

export default function Home() {
  const [apiStatus, setApiStatus] = useState<"checking" | "online" | "offline">(
    "checking"
  );

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch("http://localhost:3000", {
          method: "GET",
          signal: AbortSignal.timeout(5000),
        });
        setApiStatus(response.ok ? "online" : "offline");
      } catch {
        setApiStatus("offline");
      }
    };

    checkApiStatus();
    const interval = setInterval(checkApiStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <pre className="overflow-x-auto font-mono text-sm">{TITLE_TEXT}</pre>

      <div className="mb-6 flex gap-4 justify-start">
        <a
          href="/sign-in"
          className="px-4 py-2 bg-white text-black border rounded-md hover:bg-gray-100 transition-colors"
        >
          Sign In
        </a>
        <a
          href="/sign-up"
          className="px-4 py-2 bg-white text-black border rounded-md hover:bg-gray-100 transition-colors"
        >
          Sign Up
        </a>
        <a
          href="/dashboard"
          className="px-4 py-2 bg-white text-black border rounded-md hover:bg-gray-100 transition-colors"
        >
          Dashboard
        </a>
      </div>

      <div className="grid gap-6">
        <section className="rounded-lg border p-4">
          <h2 className="mb-2 font-medium">API Status</h2>
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                apiStatus === "online"
                  ? "bg-green-500"
                  : apiStatus === "offline"
                  ? "bg-red-500"
                  : "bg-yellow-500 animate-pulse"
              }`}
            ></div>
            <span className="text-sm">
              {apiStatus === "online"
                ? "Working - Backend Online"
                : apiStatus === "offline"
                ? "Offline - Backend Unavailable"
                : "Checking..."}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
