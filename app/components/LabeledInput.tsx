import { Input, Textarea } from "@/components/index.ts";
import { cn, forwardRef, type JSX } from "@/utils.ts";

type LabeledInputProps<T extends keyof JSX.IntrinsicElements = "input"> =
  & JSX.IntrinsicElements[T]
  & {
    label: string;
  };

export const LabeledInput = forwardRef<HTMLInputElement, LabeledInputProps>(
  ({ label, ...props }, ref) => {
    return (
      <label class="flex-1 flex flex-col items-start">
        <span class="text-sm">{label}</span>
        <Input {...props} class={cn("w-full", props.class)} ref={ref} />
      </label>
    );
  },
);

export const LabeledTextarea = forwardRef<
  HTMLTextAreaElement,
  LabeledInputProps<"textarea">
>(({ label, ...props }, ref) => {
  return (
    <label class="flex-1 flex flex-col items-start">
      <span class="text-sm">{label}</span>
      <Textarea
        {...props}
        class={cn("w-full", props.class)}
        ref={ref}
      />
    </label>
  );
});
