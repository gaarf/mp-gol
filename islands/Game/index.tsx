import { Button } from "@/components/Button.tsx";
import { useCallback, useEffect, useState } from "@/hooks.ts";
import { createEmptyGrid, getNextGeneration, type Grid } from "./logic.ts";

const ROWS = 20;
const COLS = 20;

export const GameOfLife = () => {
  const [grid, setGrid] = useState<Grid>(createEmptyGrid(ROWS, COLS));
  const [isRunning, setIsRunning] = useState(false);
  const [tick, setTick] = useState(0);
  const [tout, setTout] = useState<number | null>(null);

  const toggleCell = useCallback((row: number, col: number) => {
    setGrid((old) =>
      old.map((r, i) =>
        r.map((c, j) => (i === row && j === col ? (c === 1 ? 0 : 1) : c))
      )
    );
  }, []);

  const toggleGame = useCallback(() => {
    if (tout) {
      clearTimeout(tout);
    }
    setIsRunning((r) => !r);
  }, [tout]);

  const resetGame = useCallback(() => {
    setGrid(createEmptyGrid(ROWS, COLS));
    setTick(0);
    setIsRunning(false);
    if (tout) {
      clearTimeout(tout);
    }
  }, [tout]);

  useEffect(() => {
    if (isRunning) {
      setTout(setTimeout(() => {
        setGrid((prevGrid) => getNextGeneration(prevGrid));
        setTick((prevTick) => prevTick + 1);
      }, 1000));
    }
  }, [isRunning, tick]);

  return (
    <div class="flex flex-col items-center p-2 gap-5">
      <div class="flex gap-2 items-center justify-between w-full [&>button]:w-20">
        <Button onClick={toggleGame} intent="warning">
          {isRunning ? "Stop" : "Start"}
        </Button>
        <span>{tick}</span>
        <Button onClick={resetGame} intent="danger">
          Clear
        </Button>
      </div>

      <div
        class="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              class={`w-4 h-4 ${
                cell ? "bg-default-text" : "bg-default-bg"
              } border`}
              onClick={() => toggleCell(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
};
