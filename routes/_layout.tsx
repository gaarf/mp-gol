import { Header } from "$islands/Header.tsx";
import { Container } from "@/components/Container.tsx";
import { Partial } from "$fresh/runtime.ts";
import { type PageProps } from "@/types.ts";

export default function Layout({ Component, state }: PageProps) {
  return (
    <>
      <Header fixed>
        <a href="/">
          <Logo />
        </a>
      </Header>

      <Container class="self-center flex-1 flex-col items-stretch justify-start py-4">
        <Partial name="layout0">
          {state.message && <output>{state.message}</output>}
          <Component />
        </Partial>
      </Container>

      <footer class="flex flex-col items-center p-4">
        <Logo />
        <p class="text-xs text-center m-2">
          &copy; {new Date().getFullYear()} Gaarf
        </p>
      </footer>
    </>
  );
}

function Logo() {
  return <span class="w-20 dark:invert">🐈</span>;
}
