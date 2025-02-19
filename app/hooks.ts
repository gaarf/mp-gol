export { useCallback, useState } from "preact/hooks";
export { useTheme } from "@/theme/index.ts";

import { IS_BROWSER, randomID } from "@/utils.ts";
import { useEffect, useMemo, useRef } from "preact/hooks";
import {
  type ReadonlySignal,
  useComputed,
  useSignal,
  useSignalEffect,
} from "@preact/signals";
import { type JsonValue } from "@std/json";
export { useComputed, useEffect, useMemo, useRef, useSignal, useSignalEffect };

export function useRandomID(length?: number) {
  return useMemo(() => randomID(length), [length]);
}

export type QuerySignals<T> = [
  ReadonlySignal<T | null | undefined>,
  ReadonlySignal<Error | null>,
];

export function useQuery<T = unknown>(
  fetchFn: () => Promise<T> | undefined,
): QuerySignals<T> {
  const output = useSignal<T | undefined>(undefined);
  const error = useSignal<Error | null>(null);
  useEffect(() => {
    fetchFn()?.then(
      (result) => output.value = result,
      (reason) => error.value = new Error(reason, { cause: fetchFn }),
    );
  }, []);

  return [output, error];
}

export function useJsonQuery<T extends JsonValue>(
  fetchFn: () => Promise<Response>,
) {
  const output = useSignal<T | undefined>(undefined);
  const jsonError = useSignal<Error | null>(null);
  const [response, error] = useQuery(fetchFn);
  useSignalEffect(() => {
    const r = response.value;
    if (r?.ok) {
      r.json().then(
        (result) => output.value = result,
        (reason) => jsonError.value = new Error(reason, { cause: r }),
      );
    } else {
      const s = r?.status || 0;
      if (error.value || s > 399) {
        jsonError.value = error.value ||
          new Error(`HTTP ${s} ${r?.statusText}`, { cause: r });
      }
    }
  });
  return [output, jsonError] as QuerySignals<T>;
}

export function useEventListener<K extends keyof DocumentEventMap>(
  type: K,
  listener: (event: DocumentEventMap[K]) => void,
  target?: Document,
): void;

export function useEventListener<K extends keyof WindowEventMap>(
  type: K,
  listener: (event: WindowEventMap[K]) => void,
  target: Window,
): void;

export function useEventListener(
  type: string,
  listener: EventListener,
  target: EventTarget = globalThis.document,
) {
  useEffect(() => {
    if (!IS_BROWSER) return;

    target.addEventListener(type, listener);

    return () => {
      target.removeEventListener(type, listener);
    };
  }, [target, type, listener]);
}
