import { defineConfig } from "$fresh/server.ts";
import tailwind from "$fresh/plugins/tailwind.ts";
import theme from "@/theme/plugin.ts";

export default defineConfig({
  plugins: [tailwind(), theme()],
});
