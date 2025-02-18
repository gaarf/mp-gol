import { Box } from "@/components/intrinsic.ts";
import { cn, type Intent, type PropsWithChildren } from "@/utils.ts";

export const Card = ({
  children,
  class: className,
  intent = "neutral",
}: PropsWithChildren<{ class?: string; intent?: Intent }>) => {
  return (
    <Box
      class={cn(
        "flex-col items-start gap-2 py-3 px-4 rounded shadow overflow-hidden",
        {
          "bg-neutral-2": intent === "neutral",
          "bg-accent-3": intent === "accent",
          "bg-warning-3": intent === "warning",
          "bg-success-3 dark:bg-success-5": intent === "success",
          "bg-danger-5 text-white": intent === "danger",
        },
        className,
      )}
    >
      {children}
    </Box>
  );
};
