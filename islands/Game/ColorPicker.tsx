import { validateColor } from "@/game-of-life/logic.ts";
import { useEffect, useMemo, useState } from "@/hooks.ts";
import { IS_BROWSER } from "@/utils.ts";

export function getColorFromUrl() {
  return location ? new URL(location.href).searchParams.get("color") : null;
}

export const ColorPicker = () => {
  if (!IS_BROWSER) return null; // client-side only

  const urlColor = useMemo(getColorFromUrl, []);

  const [current, setCurrent] = useState(() => {
    return validateColor(urlColor);
  });

  useEffect(() => {
    // ensure the URL is always up-to-date
    if (current !== urlColor) {
      location.search = `?color=${current}`;
    }
  }, [urlColor]);

  return (
    <form class="flex justify-center">
      <label class="flex items-center gap-1 text-xs">
        <span class="whitespace-nowrap">Your color:</span>
        <input
          type="color"
          value={current}
          name="color"
          class="bg-transparent cursor-pointer hover:scale-110 focus-within:scale-110"
          onInput={(event) => setCurrent(event.currentTarget.value)}
          onBlur={(event) => event.currentTarget.form?.submit()}
        />
        <code>{current}</code>
      </label>
    </form>
  );
};
