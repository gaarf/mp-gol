import { type Handler, type PageProps } from "@/types.ts";
import GameIsland from "$islands/Game/index.tsx";

import GameLogic, { type Color, type Grid } from '@/game-of-life/game.ts';

interface Data {
  grid: Grid;
  color: Color;
}

const game = new GameLogic();

export const handler: Handler<Data> = (_req, ctx) => {
  const color = GameLogic.validateColor(ctx.url.searchParams.get("color"));

  return ctx.render({ color, grid: game.grid });
};

export default function Home({ data }: PageProps<Data>) {
  const { grid, color } = data!;

  return (
    <main>
      <GameIsland color={color} grid={grid} />
    </main>
  );
}
