import { cn, type Intent, type JSX, type PropsWithChildren } from "@/utils.ts";
import { useSignal } from "@preact/signals";
import { intrinsic } from "@/components/intrinsic.ts";
import { Icon } from "@/components/Icon.tsx";
import { useEventListener } from "@/hooks.ts";

export const BaseButton = intrinsic("button", {
  class: cn(
    "active:translate-y-px",
    "relative inline-flex items-center gap-2",
    "border text-neutral-12 font-bold rounded-lg py-1 px-2 select-none",
    "disabled:text-opacity-30 disabled:border-dotted disabled:pointer-events-none",
  ),
});

type ButtonProps = JSX.IntrinsicElements["button"] & {
  intent?: Intent;
  spinner?: boolean;
  href?: string;
  anchorProps?: JSX.IntrinsicElements["a"];
};

export const Button = ({
  spinner,
  intent = "neutral",
  href,
  anchorProps = {},
  children,
  ...props
}: ButtonProps) => {
  const button = (
    <BaseButton
      {...props}
      disabled={spinner || props.disabled}
      class={cn(
        {
          "bg-warning-2 border-warning-6": intent === "warning",
          "bg-success-2 border-success-6": intent === "success",
          "bg-accent-3 border-accent-6": intent === "accent",
          "bg-danger-1 border-danger-4 dark:bg-danger-4 dark:border-danger-9":
            intent === "danger",
          "bg-neutral-2 border-neutral-6": intent === "neutral",
        },
        "hover:bg-opacity-50",
        props.class,
      )}
    >
      {spinner && (
        <span class="absolute inset-0 flex items-center justify-center">
          <Icon.Spinner />
        </span>
      )}
      <span
        class={cn(
          "flex flex-1 items-center justify-center gap-2 overflow-hidden",
          {
            invisible: spinner,
          },
        )}
      >
        <span class="whitespace-nowrap overflow-hidden text-ellipsis">
          {children}
        </span>
      </span>
    </BaseButton>
  );

  if (href && !spinner && !props.disabled) {
    return (
      <a
        href={href}
        {...anchorProps}
        class={cn("inline-flex", anchorProps.class)}
        tabIndex={-1}
      >
        {button}
      </a>
    );
  }
  return button;
};

export const LoadingButton = (props: Omit<ButtonProps, "spinner">) => {
  const spinning = useSignal(false);

  useEventListener("visibilitychange", () => spinning.value = false);

  return (
    <Button
      {...props}
      spinner={spinning.value}
      onClick={(event) => {
        spinning.value = true;
        props.onClick?.call(null, event);
      }}
    />
  );
};

export const ButtonGroup = ({ children }: PropsWithChildren) => {
  return (
    <span
      class={cn(
        "flex [&_button]:border-transparent [&_button]:rounded-none gap-px",
        "border rounded-lg overflow-hidden bg-neutral-4",
      )}
    >
      {children}
    </span>
  );
};
