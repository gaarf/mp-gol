import { signal } from "@preact/signals-core";
import { IS_BROWSER } from "@/utils.ts";
import { useCallback } from "@/hooks.ts";

export type Intent = "danger" | "warning" | "success" | "neutral" | "accent";

export const validThemes = ["dark", "light"] as const;

export type Theme = (typeof validThemes)[number];

export const themeSignal = signal(
  IS_BROWSER
    ? document.documentElement.dataset.theme as Theme | undefined
    : undefined,
);

themeSignal.subscribe((value) => {
  if (IS_BROWSER && validThemes.includes(value as Theme)) {
    console.log("theme", value);
    document.documentElement.dataset.theme = value;
    document.cookie = `theme=${value};path=/;max-age=31536000`;
  }
});

export function useTheme(): [Theme, () => void] {
  const toggleTheme = useCallback(() => {
    const [a, b] = validThemes;
    themeSignal.value = themeSignal.peek() === a ? b : a;
  }, []);

  return [themeSignal.value || validThemes[0], toggleTheme];
}
