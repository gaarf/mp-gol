import type { Handler } from "@/types.ts";

function format(ms: number) {
  const diff = performance.now() - ms;
  return Intl.NumberFormat("en-US", {
    style: "unit",
    unit: "millisecond",
    unitDisplay: "narrow",
    useGrouping: false,
    maximumFractionDigits: 0,
  }).format(diff);
}

export const handler: Handler = async (req, ctx) => {
  if (ctx.destination === "internal") {
    return ctx.next();
  }
  const start = performance.now();

  ctx.state.env = {
    // PUBLIC_SUPABASE_URL: Deno.env.get("SUPABASE_URL")!,
    // PUBLIC_SUPABASE_ANON_KEY: Deno.env.get("SUPABASE_ANON_KEY")!,
    // PUBLIC_GOOGLE_CLIENT_ID: Deno.env.get("GOOGLE_CLIENT_ID")!,
  };

  const resp = await ctx.next();
  const url = new URL(req.url);

  console.debug(
    req.method,
    (ctx.route || url.pathname) + url.search,
    resp.status,
    format(start),
  );

  return resp;
};
