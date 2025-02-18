import { validateColor } from "@/game-of-life/logic.ts";
import { useState } from "@/hooks.ts";

export const ColorPicker = () => {
  if (!location) return null; // client-side only

  const [current, setCurrent] = useState(() => {
    return validateColor(new URL(location.href).searchParams.get("color"));
  });

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
