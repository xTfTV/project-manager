"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoginResponse {
    success: boolean;
    message: string;
}

export default function Home() {
  const router = useRouter();
  
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <title>Login</title>
      <div className="flex flex-col gap-8">
        <h1 className="text-6xl">Welcome Back!</h1>

        <div className="w-96 rounded-xl bg-[#1f1f1f]">
          <form className="flex flex-col gap-6 p-8"
                onSubmit={async (event) => {
                  event.preventDefault();

                  setErrorMessage("");
                  setIsSubmitting(true);

                  const formData = new FormData(event.currentTarget);

                  const email = formData.get("email");
                  const password = formData.get("password");

                  try {
                    const response = await fetch("/api/login", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        email,
                        password,
                      }),
                    });

                    const data: LoginResponse = await response.json();

                    if (!response.ok) {
                      setErrorMessage(data.message || "Invalid email or password");
                      return;
                    }
                    router.push("/dashboard")
                  } catch (error) {
                    console.error("Login Request Failed:", error);
                    setErrorMessage("Unable to connect to the server.");
                  } finally {
                    setIsSubmitting(false);
                  }
                }} >
            <div className="flex flex-col gap-2">
              <label className="font-bold">Username</label>
              <input
                name="email"
                type="text"
                className="h-10 rounded-md border border-gray-600 bg-[#303030] px-3 py-2 outline-none focus:border-red-500"
                placeholder="e.g: john.doe@gmail.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold">Password</label>
              <input
                name="password"
                type="password"
                className="h-10 rounded-md border border-gray-600 bg-[#303030] px-3 py-2 outline-none focus:border-red-500"
                placeholder="e.g: password123"
              />
            </div>

            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}

            <div className="flex flex-col gap-2">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-red-500 h-9 rounded-md font-bold"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}