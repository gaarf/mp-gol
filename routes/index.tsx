import { type Handler, type PageProps } from "@/types.ts";
import GameIsland from "$islands/Game/index.tsx";

import { validateColor, type Color, type Grid } from "@/game-of-life/logic.ts";
import gameInstance from "@/game-of-life/instance.ts";

interface Data {
  grid: Grid;
  color: Color;
}

export const handler: Handler<Data> = (_req, ctx) => {
  const color = validateColor(ctx.url.searchParams.get("color"));
  return ctx.render({ color, grid: gameInstance.grid });
};

export default function Home({ data }: PageProps<Data>) {
  const { grid, color } = data!;

  return (
    <main>
      <GameIsland color={color} grid={grid} />
    </main>
  );
}
