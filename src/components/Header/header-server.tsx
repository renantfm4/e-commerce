import { cookies } from "next/headers";
import HeaderClient from "./index";

export type AuthUser = {
  id: string;
  email: string;
  name?: string | null;
};

export default async function HeaderServer() {
  const cookieStore = await cookies();
  const raw = cookieStore.get("auth_user")?.value;

  let user: AuthUser | null = null;

  if (raw) {
    try {
      user = JSON.parse(raw);
    } catch {
      user = null;
    }
  }

  return <HeaderClient user={user} />;
}