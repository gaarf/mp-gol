import { type Grid } from "@/game-of-life/logic.ts";
import { useCallback, useMemo, useState } from "@/hooks.ts";
import { getColorFromUrl } from "./ColorPicker.tsx";
import { Controls } from "./Controls.tsx";
import { toast } from "@/utils.ts";
import { randomIntegerBetween } from "@std/random";

type GameIslandProps = {
  initialGrid: Grid;
};

export const GameIsland = ({ initialGrid }: GameIslandProps) => {
  const color = useMemo(getColorFromUrl, []);
  const [grid, setGrid] = useState(initialGrid);
  const cols = grid[0].length;

  const ws = useMemo(() => {
    if (!location) return null; // client-side only

    const ws = new WebSocket(location.origin.replace(/^http/, "ws"));
    ws.addEventListener("open", () => {
      toast("Connected to server");
    });

    ws.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      setGrid(data.grid);
      console.log(data.tick);
    });

    return ws;
  }, []);

  const colorize = useCallback((x: number, y: number) => {
    ws?.send(JSON.stringify({ x, y, color }));
    setGrid((old) =>
      old.map((row, rowIndex) =>
        rowIndex === y
          ? row.map((cell, cellIndex) => (cellIndex === x ? color! : cell))
          : row
      )
    );
  }, []);

  const handlePattern = useCallback((pattern: string) => {
    const lines = pattern.split("\n").filter((line) => line.length > 0);
    const height = lines.length;
    const width = Math.max(...lines.map((line) => line.length));

    const xStart = randomIntegerBetween(0, cols - width - 1);
    const yStart = randomIntegerBetween(0, grid.length - height - 1);

    console.log(lines, { xStart, yStart });
  }, []);

  return (
    <>
      <Controls onPattern={handlePattern}>Click and drag to draw!</Controls>
      <div
        class="grid gap-px"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        onTouchMove={(event) => event.preventDefault()}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              tabIndex={1}
              key={`${rowIndex}-${colIndex}`}
              class="border aspect-square hover:shadow-xl hover:scale-110 transition cursor-pointer"
              style={{ backgroundColor: cell }}
              onPointerDown={(event) => {
                event.button !== 1 && colorize(colIndex, rowIndex);
              }}
              onPointerEnter={(event) => {
                event.pressure && colorize(colIndex, rowIndex);
              }}
            />
          ))
        )}
      </div>
    </>
  );
};

export default GameIsland;
