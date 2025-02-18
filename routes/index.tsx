import { type Handler, type PageProps } from "@/types.ts";
import GameIsland from "$islands/Game/index.tsx";

import { type Grid } from "@/game-of-life/logic.ts";
import getInstance from "@/game-of-life/instance.ts";

interface Data {
  grid: Grid;
}

export const handler: Handler<Data> = (request, ctx) => {
  const game = getInstance();

  if (request.headers.get("upgrade") === "websocket") {
    const { socket, response } = Deno.upgradeWebSocket(request);

    socket.addEventListener("open", () => {
      game.addPlayer(socket);
    });
    socket.addEventListener("close", () => {
      game.removePlayer(socket);
    });

    return response;
  }

  return ctx.render({ grid: game.grid });
};

export default function Home({ data }: PageProps<Data>) {
  const { grid } = data!;

  return (
    <main>
      <GameIsland initialGrid={grid} />
    </main>
  );
}
