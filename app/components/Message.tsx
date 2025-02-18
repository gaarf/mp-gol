import { Card, IntentIcon } from "@/components/index.ts";
import {
  cn,
  type Intent,
  type PropsWithChildren,
  type StatefulContext,
} from "@/utils.ts";
import { createElement } from "preact";

export function createMessage(
  content: unknown,
  intent?: Intent,
) {
  return createElement(Message, { intent }, String(content));
}

export function setMessage(
  ctx: StatefulContext,
  content: unknown,
  intent?: Intent,
) {
  ctx.state.message = createMessage(content, intent);
}

export const Message = ({
  children,
  class: className,
  intent = "neutral",
}: PropsWithChildren<{
  class?: string;
  intent?: Intent;
}>) => {
  return (
    <Card
      intent={intent}
      class={cn(
        "flex-row justify-start gap-3 items-center rounded-full",
        className,
      )}
    >
      <IntentIcon intent={intent} class="text-neutral-6 dark:invert" />
      <span class="font-bold">
        {children}
      </span>
    </Card>
  );
};
