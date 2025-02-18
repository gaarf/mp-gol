import type { Theme } from "@/theme/index.ts";
import type {
  FreshContext,
  Handler as FreshHandler,
  Handlers as FreshHandlers,
  MiddlewareHandler as FreshMiddlewareHandler,
  PageProps as FreshPageProps,
  Plugin as FreshPlugin,
  RouteContext as FreshRouteContext,
} from "$fresh/server.ts";

export type { Intent } from "@/theme/index.ts";
export type { HTMLAttributes, JSX, PropsWithChildren } from "preact/compat";

import type { ComponentChildren, VNode } from "preact";
export type { ComponentChildren, VNode };

export type PublicEnv = Record<`PUBLIC_${Capitalize<string>}`, string>;

export interface State {
  env: PublicEnv;
  theme: Theme;
  message?: ComponentChildren;
}

export type StatefulContext = FreshContext<State>;
export type PageProps<T = unknown, S = State> = FreshPageProps<
  T | undefined,
  S
>;
export type Handler<T = unknown, S = State> = FreshHandler<T, S>;
export type Handlers<T = unknown, S = State> = FreshHandlers<T, S>;
export type RouteContext<T = unknown, S = State> = FreshRouteContext<T, S>;
export type MiddlewareHandler = FreshMiddlewareHandler<State>;
export type Plugin = FreshPlugin<Partial<State>>;
