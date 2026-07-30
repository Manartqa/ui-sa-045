import { redirect } from "next/navigation";

/** Bare /login keeps working — the officer screen is the default entry point. */
export default function LoginPage() {
  redirect("/login/officer");
}
