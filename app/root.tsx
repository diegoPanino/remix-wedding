import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@vercel/remix";
import { json } from '@vercel/remix';
import { LoaderFunctionArgs } from "@remix-run/server-runtime";
import { Analytics } from "@vercel/analytics/react";
import i18next from "./i18next.server";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next/react";
import resetStyle from './styles/reset.css?url';
import appStyle from "./styles/app.css?url";
import tailwindStyles from "./styles/tailwind.css?url";



export async function loader({ request }: LoaderFunctionArgs) {
	let locale = await i18next.getLocale(request);
	return json({ locale });
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: resetStyle },
  { rel: "stylesheet", href: appStyle },
  { rel: "stylesheet", href: tailwindStyles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" },
  
];

export let handle = {
	// In the handle export, we can add a i18n key with namespaces our route
	// will need to load. This key can be a single string or an array of strings.
	// TIP: In most cases, you should set this to your defaultNS from your i18n config
	// or if you did not set one, set it to the i18next default namespace "translation"
	i18n: "translation",
};

export function Layout({ children }: { children: React.ReactNode }) {
  // Get the locale from the loader
	let { locale } = useLoaderData<typeof loader>();

	let { i18n } = useTranslation();

	// This hook will change the i18n instance language to the current locale
	// detected by the loader, this way, when we do something to change the
	// language, this locale will change and i18next will load the correct
	// translation files
	useChangeLanguage(locale);
  return (
    <html lang={locale} className="bg-cyan-900">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Analytics />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
