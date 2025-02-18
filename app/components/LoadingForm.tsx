import { Button } from "@/components/Button.tsx";
import { Box } from "@/components/intrinsic.ts";
import { useCallback, useState } from "@/hooks.ts";
import {
  cn,
  type ComponentChildren,
  type JSX,
  type PropsWithChildren,
} from "@/utils.ts";

type LoadingFormProps = PropsWithChildren<
  {
    beforeContent?: ComponentChildren;
    onSubmit?: () => void;
  } & JSX.IntrinsicElements["form"]
>;

export const LoadingForm = ({
  children,
  beforeContent,
  onSubmit,
  class: className,
  ...props
}: LoadingFormProps) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = useCallback(() => {
    setLoading(true);
    return onSubmit?.();
  }, [onSubmit]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (
      e.target instanceof HTMLTextAreaElement && e.key === "Enter" && e.metaKey
    ) {
      e.target.form?.submit();
      handleSubmit();
    }
  }, [handleSubmit]);

  return (
    <form
      method="post"
      class={cn(
        "flex w-full p-4 rounded bg-neutral-1 flex-col items-start gap-4",
        className,
      )}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <fieldset class="flex flex-col gap-2 w-full">{children}</fieldset>
      <Box
        class={cn("justify-end gap-2 self-stretch", {
          "flex-row-reverse": !!beforeContent,
        })}
      >
        <Button type="submit" spinner={loading} intent="success">
          Submit
        </Button>
        {beforeContent && (
          <span class="flex-1">
            {beforeContent}
          </span>
        )}
      </Box>
    </form>
  );
};
