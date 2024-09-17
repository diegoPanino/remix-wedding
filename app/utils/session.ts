import { createCookieSessionStorage } from "@remix-run/node";

const ss = process.env.ss!;

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
    cookie: {
        name: "__session",
        secure: process.env.NODE_ENV === 'production',
        secrets: [ss],
        sameSite: "lax",
        path: "/",
        httpOnly: true
    },
});

export { getSession, commitSession, destroySession };