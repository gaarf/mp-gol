// Purpose: Contains the logic for the game of life.
export type Color = string; // hex color
export type Cell = Color | undefined; // alive or dead
export type Grid = Cell[][];

export default class GameLogic {
  public grid: Grid;
  public tick = 0;

  constructor(public cols = 20, public rows = 20) {
    this.grid = this.createEmptyGrid();
  }

  public iterate() {
    this.grid = this.getNextGeneration();
    this.tick++;
  }

  public setCell(x: number, y: number, color: Color) {
    if (x >= 0 && x < this.rows && y >= 0 && y < this.cols) {
      this.grid[x][y] = color;
    } else {
      throw new Error(`Cell (${x}, ${y}) is out of bounds`);
    }
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
      if (x < 0 || x >= rows || y < 0 || y >= cols) return undefined;
      return this.grid[x][y];
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
        const cell = this.grid[x][y];

        if (cell) {
          // alive
          newGrid[x][y] = count === 2 || count === 3 ? cell : undefined;
        } else if (count === 3) {
          // dead but has 3 neighbors
          newGrid[x][y] = average(colors);
        }
      }
    }

    return newGrid;
  }

  static validateColor(input: string | null): Color {
    const color = String(input || "");
    return /^#[0-9a-f]{6}$/i.test(color) ? color : "#00ff00";
  }
}

function average(colors: Color[]): Color {
  const n = colors.length;
  const add = (a: number, b: number) => a + b;
  const rgb = [
    colors.map((c) => parseInt(c.slice(1, 3), 16)).reduce(add, 0) / n,
    colors.map((c) => parseInt(c.slice(3, 5), 16)).reduce(add, 0) / n,
    colors.map((c) => parseInt(c.slice(5, 7), 16)).reduce(add, 0) / n,
  ].map((v) => Math.round(v).toString(16));
  return `#${rgb.join("")}`;
}
