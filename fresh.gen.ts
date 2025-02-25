// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_500 from "./routes/_500.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_layout from "./routes/_layout.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $index from "./routes/index.tsx";
import * as $Game_ColorPicker from "./islands/Game/ColorPicker.tsx";
import * as $Game_Controls from "./islands/Game/Controls.tsx";
import * as $Game_index from "./islands/Game/index.tsx";
import * as $Header from "./islands/Header.tsx";
import * as $Toaster from "./islands/Toaster.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_500.tsx": $_500,
    "./routes/_app.tsx": $_app,
    "./routes/_layout.tsx": $_layout,
    "./routes/_middleware.ts": $_middleware,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/Game/ColorPicker.tsx": $Game_ColorPicker,
    "./islands/Game/Controls.tsx": $Game_Controls,
    "./islands/Game/index.tsx": $Game_index,
    "./islands/Header.tsx": $Header,
    "./islands/Toaster.tsx": $Toaster,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
