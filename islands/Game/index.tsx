import { type Grid } from "@/game-of-life/logic.ts";
import { useCallback, useMemo, useState } from "@/hooks.ts";
import { getColorFromUrl } from "$islands/Game/ColorPicker.tsx";
import { toast } from "@/utils.ts";

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

  const handleClickedCell = useCallback((x: number, y: number) => {
    ws?.send(JSON.stringify({ x, y, color }));
    setGrid((old) =>
      old.map((row, rowIndex) =>
        rowIndex === y
          ? row.map((cell, cellIndex) => (cellIndex === x ? color! : cell))
          : row
      )
    );
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
            onPointerDown={() => handleClickedCell(colIndex, rowIndex)}
            onPointerEnter={(event) =>
              event.pressure && handleClickedCell(colIndex, rowIndex)
            }
          />
        ))
      )}
    </div>
  );
};

export default GameIsland;
