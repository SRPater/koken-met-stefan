"use client";

import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm text-center">
      <h1 className="font-gaegu text-3xl text-stone-800 dark:text-stone-200">
        Inloggen
      </h1>
      <button
        onClick={() =>
          authClient.signIn.social({ provider: "github", callbackURL: "/" })
        }
        className="mt-6 rounded bg-crimson px-6 py-2 text-white dark:bg-cyan dark:text-stone-950"
      >
        Inloggen met GitHub
      </button>
    </div>
  );
}
