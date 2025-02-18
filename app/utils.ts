export { IS_BROWSER } from "$fresh/runtime.ts";
export { toast } from "react-toastify";
export { createPortal, forwardRef } from "react-dom"; // preact/compat

// @ts-types="npm:@types/luxon"
import { DateTime } from "luxon";

export { DateTime };

export const isoNow = () => DateTime.now().toUTC().toISO();
export const httpNow = () => DateTime.now().toHTTP();

import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

import type { StatefulContext } from "@/types.ts";
export function redirect(
  ctx: StatefulContext,
  pathname: string,
  query: Record<string, string> = {},
) {
  const to = new URL(pathname, ctx.url);
  Object.entries(query).forEach((n) => to.searchParams.set(...n));
  return Response.redirect(to);
}

import ShortUniqueId from "short-unique-id";
const sui = new ShortUniqueId({ length: 10, dictionary: "alpha" });
export const randomID = sui.randomUUID; // alpha = can be used for css ids

export * from "@/types.ts";
