import { h, type VNode } from "preact";
import { cn, type JSX } from "@/utils.ts";

type Tag = keyof JSX.IntrinsicElements;
type IntrinsicProps<T extends Tag> = JSX.IntrinsicElements[T];

export function intrinsic<T extends Tag>(
  tag: T,
  baseProps?: IntrinsicProps<T>,
) {
  return (props: typeof baseProps) => {
    const newProps = {
      ...baseProps,
      ...props,
      class: cn(baseProps?.class, props?.class),
    };
    // @ts-expect-error: preact
    return h(tag, newProps, props?.children) as VNode<IntrinsicProps<T>>;
  };
}

const inputKlass = "border rounded bg-default-bg p-1 shadow-inner";

export const Input = intrinsic("input", {
  class: inputKlass,
});

export const Select = intrinsic("select", {
  class: cn(inputKlass, "min-h-[34px]"),
});

export const Textarea = intrinsic("textarea", {
  class: cn(inputKlass, "font-mono"),
});

export const Box = intrinsic("div", {
  class: "flex justify-between items-center",
});

export const Link = intrinsic("a", {
  class: "underline hover:decoration-wavy",
});

export const Pre = intrinsic("pre", {
  class: "bg-neutral-1 rounded overflow-auto p-2",
});

export const Code = intrinsic("code", {
  class:
    "bg-neutral-1 border border-neutral-5 font-mono text-xs rounded p-1 break-all",
});

export const Dialog = intrinsic("dialog", {
  class: cn(`
    bg-default-bg text-default-text
    sm:max-w-lg min-w-80
    shadow-xl border rounded-xl *:p-2
    open:transition-transform scale-0 open:scale-100
    backdrop:backdrop-blur 
    overflow-hidden flex flex-col
  `),
  onClick(e) {
    if (e.target instanceof HTMLDialogElement) {
      e.target.close();
    }
  },
});
