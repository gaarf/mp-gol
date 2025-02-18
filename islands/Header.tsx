import { cn, type PropsWithChildren } from "@/utils.ts";
import { Container } from "@/components/index.ts";
import { Switch as ThemeSwitch } from "@/theme/Switch.tsx";
import { ColorPicker } from "$islands/Game/ColorPicker.tsx";

type HeaderProps = {
  fixed?: boolean;
  heightClass?: string;
};

export const Header = ({
  children,
  fixed,
  heightClass = "min-h-12",
}: PropsWithChildren<HeaderProps>) => {


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
          <h1 class="text-center text-ellipsis whitespace-nowrap overflow-hidden">
            {children}
          </h1>
          <nav class="flex gap-2">
            <ColorPicker />
            <ThemeSwitch />
            {/* <Button href="/profile">
              <Icon.User />
            </Button> */}
          </nav>
        </Container>
      </div>
    </header>
  );
};
