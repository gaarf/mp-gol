import { Box } from "@/components/intrinsic.ts";
import { cn, PropsWithChildren } from "@/utils.ts";

export const Container = ({
  children,
  class: className,
}: PropsWithChildren<{ class?: string }>) => {
  return (
    <Box
      class={cn(
        "gap-4 justify-between w-full px-6 max-w-5xl",
        className,
      )}
    >
      {children}
    </Box>
  );
};
