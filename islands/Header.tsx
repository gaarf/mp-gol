import { cn, type PropsWithChildren } from "@/utils.ts";
import { Button, Container, Icon } from "@/components/index.ts";
import { Switch as ThemeSwitch } from "@/theme/Switch.tsx";
import { useEffect, useMemo, useRef } from "@/hooks.ts";
import { debounce } from "$std/async/debounce.ts";

type HeaderProps = {
  fixed?: boolean;
  heightClass?: string;
};

export const Header = ({
  children,
  fixed,
  heightClass = "min-h-12",
}: PropsWithChildren<HeaderProps>) => {
  const formRef = useRef<HTMLFormElement>(null);

  // instructions say "Should display results after typing, pressing enter not required."
  const handleInput = useMemo(
    () =>
      debounce(() => {
        formRef.current?.submit();
      }, 1000),
    [],
  );

  // because SSR, we reload the page to search.
  // buggy attempt to keep focus on search box
  useEffect(() => {
    const { searchParams } = new URL(location.href);
    if (searchParams.has("search")) {
      const input = formRef.current?.firstElementChild as HTMLInputElement;
      input.focus();
      input.value = searchParams.get("search") || "";
    }
  }, [formRef.current]);

  return (
    <header class={cn("flex", heightClass)}>
      <div
        class={cn(
          "flex w-full justify-center",
          "shadow-lg bg-neutral-2",
          {
            "fixed z-20": fixed,
          },
          heightClass,
        )}
      >
        <Container>
          <h1 class="text-center text-lg font-bold text-ellipsis whitespace-nowrap overflow-hidden uppercase">
            {children}
          </h1>
          <form action="/" class="flex-1" ref={formRef}>
            <input
              type="search"
              name="search"
              class="w-full rounded-full px-3 py-1 text-black"
              onInput={handleInput}
            />
          </form>
          <nav class="flex gap-2">
            <ThemeSwitch />
            <Button href="/profile">
              <Icon.User />
            </Button>
          </nav>
        </Container>
      </div>
    </header>
  );
};
