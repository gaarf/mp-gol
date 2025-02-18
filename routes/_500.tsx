import { PageProps } from "$fresh/server.ts";
import { Link, Message } from "@/components/index.ts";

export default function Error500Page({ error }: PageProps) {
  const message = (error as Error)?.message;
  return (
    <>
      {message && (
        <Message intent="danger">
          {message}
        </Message>
      )}

      <main class="py-8 flex flex-col items-center justify-center gap-5">
        <h1 class="text-4xl font-bold">500 - Internal error</h1>
        <Link href="/" class="underline">Go back home</Link>
      </main>
    </>
  );
}
