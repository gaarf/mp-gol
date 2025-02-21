import { type Grid } from "@/game-of-life/logic.ts";
import { useMemo, useState } from "@/hooks.ts";
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

  const colorize = (target: EventTarget | null, color?: string) => {
    if (!(target instanceof HTMLSpanElement && socket)) {
      return;
    }
    const [x, y] = target.dataset.xy!.split(",").map(Number);

    // bail if already colorized
    if (grid[y][x] === color) {
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
  };

  // when a pattern button is pressed
  const handlePattern = (pattern: string) => {
    const lines = pattern.split("\n");
    const height = lines.length;

    // measure the pattern
    const width = Math.max(...lines.map((line) => line.length));

    // find a place within the grid to place it
    const xStart = randomIntegerBetween(0, cols - width);
    const yStart = randomIntegerBetween(0, grid.length - height);

    const color = getColorFromUrl()!;

    // find all relevant elements
    for (let y = 0; y < height; y++) {
      const line = lines.at(y);
      for (let x = 0; x < width; x++) {
        const span = document.querySelector(
          `span[data-xy="${xStart + x},${yStart + y}"]`
        );
        // clear or colorize the cell accordingl to the pattern
        colorize(span, line?.at(x) === "■" ? color : undefined);
      }
    }
  };

  return (
    <>
      <Controls onPattern={handlePattern} />
      <div
        class="grid gap-px touch-none"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        onPointerDown={(event) => {
          // single tap or click
          if (event.button === 0) {
            colorize(event.target, getColorFromUrl()!);
          }
        }}
        onPointerMove={(event) => {
          // dragging around with the mouse
          if (event.pressure) {
            colorize(event.target, getColorFromUrl()!);
          }
        }}
        onTouchMove={(event) => {
          // dragging around with touch
          const [{ clientX, clientY }] = event.changedTouches;
          const target = document.elementFromPoint(clientX, clientY);
          if (target) {
            colorize(target, getColorFromUrl()!);
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
