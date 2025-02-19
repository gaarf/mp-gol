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
  const [grid, setGrid] = useState(initialGrid);
  const cols = grid[0].length;

  const socket = useMemo(() => {
    if (!location) return null; // client-side only

    const ws = new WebSocket(location.origin.replace(/^http/, "ws"));
    ws.addEventListener("open", () => {
      toast("Connected to server");
    });

    ws.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      setGrid(data.grid);
      console.log("tick", data.tick);
    });

    return ws;
  }, []);

  const colorize = useCallback(
    (target: HTMLSpanElement, color?: string) => {
      const [x, y] = target.dataset.xy!.split(",").map(Number);
      if (grid[y][x] === color || !socket) {
        return;
      }

      // tell the server
      socket.send(JSON.stringify({ x, y, color }));

      // immediately show the change locally
      setGrid((old) =>
        old.map((row, rowIndex) =>
          rowIndex === y
            ? row.map((cell, cellIndex) => (cellIndex === x ? color : cell))
            : row
        )
      );
    },
    [grid, socket]
  );

  const handlePattern = useCallback((pattern: string) => {
    const lines = pattern.split("\n").map((line) => `.${line}.`);
    const height = lines.length;
    const width = Math.max(...lines.map((line) => line.length));

    const xStart = randomIntegerBetween(0, cols - width - 1);
    const yStart = randomIntegerBetween(0, grid.length - height - 1);

    const color = getColorFromUrl()!;
    for (let y = 0; y < height; y++) {
      const line = lines.at(y);
      for (let x = 0; x < width; x++) {
        const span = document.querySelector(
          `span[data-xy="${xStart + x},${yStart + y}"]`
        );
        if (span instanceof HTMLSpanElement) {
          colorize(span, line?.at(x) === "■" ? color : undefined);
        }
      }
    }
  }, []);

  return (
    <>
      <Controls onPattern={handlePattern} />
      <div
        class="grid gap-px touch-none"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        onPointerDown={(event) => {
          // single tap or click
          if (event.button === 0 && event.target instanceof HTMLSpanElement) {
            colorize(event.target, getColorFromUrl()!);
          }
        }}
        onPointerMove={(event) => {
          // dragging around with the mouse
          // FIXME: touch event support
          if (event.pressure && event.target instanceof HTMLSpanElement) {
            colorize(event.target, getColorFromUrl()!);
          }
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const key = `${colIndex},${rowIndex}`;
            return (
              <span
                key={key}
                data-xy={key}
                class="border aspect-square hover:shadow-xl hover:scale-110 transition cursor-pointer"
                style={{ backgroundColor: cell }}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default GameIsland;
