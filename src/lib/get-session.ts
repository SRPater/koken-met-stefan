import { headers } from "next/headers";
import { auth } from "./auth";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function requireAuth() {
  const session = await getSession();
  if (!session || session.user.email !== process.env.ALLOWED_EMAIL) {
    return null;
  }
  return session;
}
