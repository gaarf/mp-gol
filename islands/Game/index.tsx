import type { Color, Grid } from "@/game-of-life/logic.ts";
import { useCallback } from "@/hooks.ts";

import { ColorPicker } from "./ColorPicker.tsx";

type GameIslandProps = {
  grid: Grid;
  color: Color;
};

export const GameIsland = ({ grid, color }: GameIslandProps) => {
  const cols = grid[0].length;

  const handleClickedCell = useCallback(
    (x: number, y: number) => {
      console.log({ x, y, color });
    },
    [color]
  );

  return (
    <>
      <ColorPicker color={color} />
      <div
        class="grid gap-px"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              class="border aspect-square hover:shadow-xl hover:scale-110 transition cursor-pointer"
              style={{ backgroundColor: cell }}
              onClick={() => handleClickedCell(colIndex, rowIndex)}
            />
          ))
        )}
      </div>
    </>
  );
};

export default GameIsland;
