import { type Handler, type PageProps } from "@/types.ts";
import { setMessage } from "@/components/Message.tsx";

interface Data {
  search?: string;
}

export const handler: Handler<Data> = (_req, ctx) => {
  const search = ctx.url.searchParams.get("search") || "";

  if (search) {
    setMessage(ctx, "Search not implemented!", "warning");
  }

  return ctx.render({ search });
};

export default function Home({ data: _data }: PageProps<Data>) {

  return (
    <main>
      hello world
    </main>
  );
}
