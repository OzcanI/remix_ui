import { createCookieSessionStorage, redirect } from "@remix-run/node";
import axios from "axios";
import invariant from "tiny-invariant";
import { getBearerConfig } from "./_utils/auth";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

const USER_SESSION_KEY = "user_auth";

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getuserObject(
  request: Request
): Promise<any | undefined> {
  const session = await getSession(request);
  const userObject = session.get(USER_SESSION_KEY);
  return userObject;
}

export async function requireUser(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
  try {
    const userObject = await getuserObject(request);
    if (!userObject) {
      throw new Error('Auth')
    }
    const { data: userInfo } = await axios.get(process.env.BACKEND_API + '/user/user-info', getBearerConfig(userObject))

    if(!userInfo?.email) {
      throw new Error('Auth')
    }
    return userObject;
  } catch(e) {
    throw redirect(`/login?${searchParams}`);
  }
  
}

export async function createUserSession({
  request,
  userObject,
  remember,
  redirectTo,
}: {
  request: Request;
  userObject: Object;
  remember: boolean;
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, userObject);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  });
}

export async function logout(request: Request) {
  const session = await getSession(request);
  session.unset(USER_SESSION_KEY)
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}