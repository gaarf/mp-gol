import { type Grid } from "@/game-of-life/logic.ts";
import { useCallback } from "@/hooks.ts";

type GameIslandProps = {
  grid: Grid;
};

export const GameIsland = ({ grid }: GameIslandProps) => {
  const cols = grid[0].length;

  const handleClickedCell = useCallback((x: number, y: number) => {
    console.log({ x, y });
  }, []);

  return (
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
  );
};

export default GameIsland;
