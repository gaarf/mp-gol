import { Pre } from "@/components/intrinsic.ts";
import { cn, type JSX } from "@/utils.ts";

type JsonProps = JSX.IntrinsicElements["pre"] & {
  value?: unknown;
};

export const Json = ({ children, value, ...props }: JsonProps) => (
  <Pre
    {...props}
    class={cn("break-all whitespace-pre-wrap text-sm", props.class)}
  >
    {typeof value === "undefined" ? children : JSON.stringify(value, null, 2)}
  </Pre>
);
