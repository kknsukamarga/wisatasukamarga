"use server";

import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export async function handleSignOut() {
  try {
    await signOut({ redirect: false });
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    redirect("/");
  }
}
