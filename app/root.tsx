import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import stylesheet from "~/tailwind.css";
import { Page } from "./_components/page";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Best Todo App Ever",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: 'https://fonts.cdnfonts.com/css/mark-pro' },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>
        <Page>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </Page>
      </body>
    </html>
  );
}
