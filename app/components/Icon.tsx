import {
  FaBomb,
  FaBtc,
  FaCircleCheck,
  FaCircleInfo,
  FaLightbulb,
  FaMessage,
  FaMoon,
  FaSpinner,
  FaTriangleExclamation,
  FaUser,
} from "@preact-icons/fa6";
import { cn } from "@/utils.ts";
import { IconBase, type IconBaseProps } from "@preact-icons/common";
import { Intent } from "@/theme/index.ts";

function icon(
  Component: typeof IconBase,
  injectClassName?: string,
  injectProps?: IconBaseProps,
) {
  return ({ className, ...props }: { className?: string } & IconBaseProps) => (
    <span className={cn(injectClassName, className)}>
      <Component {...injectProps} {...props} />
    </span>
  );
}

export const Icon = {
  User: icon(FaUser),
  Info: icon(FaCircleInfo),
  Warning: icon(FaTriangleExclamation),
  Danger: icon(FaBomb),
  Success: icon(FaCircleCheck),
  Message: icon(FaMessage),

  Spinner: icon(FaSpinner, "animate-spin"),
  Bitcoin: icon(FaBtc, undefined, {
    color: "rgb(249 115 22 / var(--tw-text-opacity))",
  }),
  ThemeDark: icon(FaMoon),
  ThemeLight: icon(FaLightbulb),
} as const;

export const IntentIcon = (
  { intent, class: className }: { intent: Intent; class?: string },
) => {
  switch (intent) {
    case "neutral":
      return <Icon.Info class={cn("text-neutral-6", className)} />;
    case "accent":
      return <Icon.Message class={cn("text-accent-6", className)} />;
    case "warning":
      return <Icon.Warning class={cn("text-warning-6", className)} />;
    case "success":
      return <Icon.Success class={cn("text-success-6", className)} />;
    case "danger":
      return <Icon.Danger class={cn("text-danger-6", className)} />;
  }
};
