import { Toaster } from "$islands/Toaster.tsx";
import { type PageProps } from "@/types.ts";

export default function App(
  { Component, state: { theme } }: PageProps,
) {
  return (
    <html data-theme={theme}>
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="text-default-text bg-default-bg min-h-svh flex flex-col">
        <Component />
        <Toaster />
      </body>
    </html>
  );
}
