import { type Handler, type PageProps } from "@/types.ts";
import GameIsland from "$islands/Game/index.tsx";

import { validateColor, type Grid } from "@/game-of-life/logic.ts";
import getInstance from "@/game-of-life/instance.ts";

interface Data {
  grid: Grid;
}

export const handler: Handler<Data> = (request, ctx) => {
  const game = getInstance();
  const color = validateColor(ctx.url.searchParams.get("color"));

  if (request.headers.get("upgrade") === "websocket") {
    const { socket, response } = Deno.upgradeWebSocket(request);

    socket.onopen = () => {
      console.log("CONNECTED");
    };
    socket.onmessage = (event) => {
      console.log(`RECEIVED: ${event.data} ${color}`);
      socket.send("pong");
    };
    socket.onclose = () => console.log("DISCONNECTED");
    socket.onerror = (error) => console.error("ERROR:", error);

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
