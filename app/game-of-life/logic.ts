import { randomIntegerBetween } from "@std/random";

// Purpose: Contains the logic for the game of life.
export type Color = string; // hex color
export type Cell = Color | undefined; // alive or dead
export type Grid = Cell[][];

export default class GameLogic {
  public grid: Grid;
  public tick = 0;
  private players: WebSocket[] = [];
  private timer: number | null = null;

  constructor(public cols = 20, public rows = 20) {
    this.grid = this.createEmptyGrid();
  }

  public addPlayer(socket: WebSocket) {
    // register player
    this.players.push(socket);
    console.log("Player count:", this.players.length);

    // send current state
    socket.send(this.serialize());

    socket.addEventListener("message", ({ data }) => {
      try {
        const { x, y, color } = JSON.parse(data);
        console.log({ x, y, color });
        this.setCell(x, y, color);
      } catch (e) {
        console.error(e);
      }
    });

    // start game if not already started
    if (this.players.length >= 1 && !this.timer) {
      console.log("Starting game...");
      this.timer = setInterval(this.iterate.bind(this), 2000);
    }
  }

  private setCell(x: number, y: number, color: Color) {
    this.grid[y][x] = color;
    this.emitStateToPlayers();
  }

  public removePlayer(socket: WebSocket) {
    this.players = this.players.filter((s) => s !== socket);
    console.log("Player count:", this.players.length);
    if (this.players.length <= 0 && this.timer) {
      console.log("Stopping game.");
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  public iterate() {
    this.grid = this.getNextGeneration();
    this.tick++;
    this.emitStateToPlayers();
  }

  private emitStateToPlayers() {
    const state = this.serialize();
    this.players.forEach((socket) => {
      socket.send(state);
    });
  }

  public serialize() {
    return JSON.stringify({ grid: this.grid, tick: this.tick });
  }

  private createEmptyGrid(): Grid {
    return Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(undefined)
    );
  }

  private getNextGeneration(): Grid {
    const { rows, cols } = this;
    const newGrid = this.createEmptyGrid();

    const getCell = (x: number, y: number): Cell => {
      if (x < 0 || x >= cols || y < 0 || y >= rows) return undefined;
      return this.grid[y][x];
    };

    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < cols; y++) {
        const colors = [
          getCell(x - 1, y - 1),
          getCell(x - 1, y),
          getCell(x - 1, y + 1),
          getCell(x, y - 1),
          getCell(x, y + 1),
          getCell(x + 1, y - 1),
          getCell(x + 1, y),
          getCell(x + 1, y + 1),
        ].filter((cell) => cell !== undefined) as Color[];

        const count = colors.length;
        const cell = getCell(x, y);

        if (cell) {
          // alive
          newGrid[y][x] = count === 2 || count === 3 ? cell : undefined;
        } else if (count === 3) {
          // dead but has 3 neighbors
          newGrid[y][x] = average(colors);
        }
      }
    }

    return newGrid;
  }
}

function average(colors: Color[]): Color {
  const n = colors.length;
  const add = (a: number, b: number) => a + b;
  const rgb = [
    colors.map((c) => parseInt(c.slice(1, 3), 16)).reduce(add, 0) / n,
    colors.map((c) => parseInt(c.slice(3, 5), 16)).reduce(add, 0) / n,
    colors.map((c) => parseInt(c.slice(5, 7), 16)).reduce(add, 0) / n,
  ].map((v) => Math.round(v).toString(16).padStart(2, "0"));
  return `#${rgb.join("")}`;
}

export function validateColor(input: string | null): Color {
  const color = String(input || "");
  return /^#[0-9a-f]{6}$/i.test(color) ? color : randomColor();
}

export function randomColor(): Color {
  const r = () => randomIntegerBetween(0, 255).toString(16).padStart(2, "0");
  return `#${r()}${r()}${r()}`;
}
