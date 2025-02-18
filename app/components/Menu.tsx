import { Button } from "@/components/Button.tsx";
import type {
  ComponentChildren,
  Intent,
  JSX,
  PropsWithChildren,
} from "@/types.ts";
import { cn } from "@/utils.ts";

type MenuProps = PropsWithChildren<{
  label: ComponentChildren;
  align?: "left" | "right";
  intent?: Intent;
}>;

export function Menu({ label, align, intent, children }: MenuProps) {
  const right = align === "right";

  return (
    <span
      class={cn("inline-flex flex-col group", {
        "items-end": right,
      })}
    >
      <Button
        class="flex-1 focus:pointer-events-none focus:opacity-50"
        intent={intent}
      >
        {label}
      </Button>
      <span
        class={cn(
          "z-10 relative select-none",
          "scale-0 group-focus-within:scale-100",
          "will-change-transform group-focus-within:transition-transform",
          right ? "origin-top-right" : "origin-top-left",
        )}
      >
        <menu
          role="menu"
          class={cn(
            "absolute border -mt-1 bg-default-bg shadow rounded-lg overflow-hidden",
            {
              "-translate-x-full": right,
              "border-danger-8 *:border-danger-8": intent === "danger",
              "border-warning-8 *:border-warning-8": intent === "warning",
              "border-accent-8 *:border-accent-8": intent === "accent",
              "border-success-8 *:border-success-8": intent === "success",
            },
          )}
        >
          {children}
        </menu>
      </span>
    </span>
  );
}

type MenuItemProps = PropsWithChildren<{ separator?: boolean }>;

export function MenuItem({ children, separator }: MenuItemProps) {
  return (
    <li
      class={cn("whitespace-nowrap *:py-1 *:px-2", {
        "border-t first:border-0": separator,
      })}
      role={separator ? "separator" : "menuitem"}
    >
      {children}
    </li>
  );
}

type MenuLinkProps = { intent?: Intent } & JSX.IntrinsicElements["a"];

export function MenuLink({ children, intent, ...props }: MenuLinkProps) {
  return (
    <MenuItem>
      <a
        {...props}
        href={props.href || "javascript:void(0)"}
        role={props.href ? "link" : "button"}
        onClick={(e) => {
          e.currentTarget.blur();
          props.onClick?.call(e.currentTarget, e);
        }}
        class={cn(
          "block -outline-offset-1 m-px",
          "text-neutral-12 hover:bg-neutral-2",
          "max-w-sm text-ellipsis overflow-hidden",
          {
            "text-danger-9 hover:bg-danger-5": intent === "danger",
            "text-accent-9 hover:bg-accent-5": intent === "accent",
            "text-success-9 hover:bg-success-5": intent === "success",
            "text-warning-9 hover:bg-warning-5": intent === "warning",
            "hover:text-white": !!intent,
          },
          props.class,
        )}
      >
        {children}
      </a>
    </MenuItem>
  );
}
