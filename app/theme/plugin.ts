import { type Theme, themeSignal, validThemes } from "@/theme/index.ts";
import { getCookies } from "$std/http/mod.ts";
import type { Plugin } from "@/types.ts";

export default function (): Plugin {
  return {
    name: "theme",
    middlewares: [{
      path: "/",
      middleware: {
        handler: async (req, ctx) => {
          if (ctx.destination !== "static") {
            let theme = getCookies(req.headers).theme as Theme;

            if (!validThemes.includes(theme)) {
              theme = validThemes[0];
            }
            ctx.state.theme = theme;
            themeSignal.value = theme;
          }

          return await ctx.next();
        },
      },
    }],
  };
}
