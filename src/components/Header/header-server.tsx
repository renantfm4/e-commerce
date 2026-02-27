import { cookies } from "next/headers";
import HeaderClient from ".";

export type AuthUser = {
  id: string;
  email: string;
  name?: string | null;
};

export default async function Header() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("auth_user")?.value;

  let user: AuthUser | null = null;

  if (userCookie) {
    try {
      user = JSON.parse(userCookie) as AuthUser;
    } catch {
      user = null;
    }
  }

  return <HeaderClient user={user} />;
}