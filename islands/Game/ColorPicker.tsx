import { type Color } from "@/game-of-life/logic.ts";
import { useState } from "@/hooks.ts";

type ColorPickerProps = {
  color?: Color;
};

export const ColorPicker = ({ color }: ColorPickerProps) => {
  const [current, setCurrent] = useState(color);

  return (
    <form class="pb-2 flex justify-center">
      <label class="flex items-center gap-2">
        <span>Your color:</span>
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
