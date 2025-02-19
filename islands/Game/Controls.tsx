import { Button, ButtonGroup } from "@/components/index.ts";
import { type PropsWithChildren } from "@/types.ts";

type ControlsProps = PropsWithChildren<{
  onPattern: (pattern: string) => void;
}>;

const patterns = {
  Blinker: `
■■■
`,
  Toad: `
.■■■
■■■
`,
  Beacon: `
■■
■■
..■■
..■■
`,
  Glider: `
.■
..■
■■■
`,
};

export const Controls = ({ children, onPattern }: ControlsProps) => {
  return (
    <div class="flex justify-between flex-col sm:flex-row items-start mb-4 gap-4">
      <p class="italic">{children}</p>
      <div class="flex items-center gap-2 text-xs">
        <span>Patterns:</span>
        <ButtonGroup>
          {Object.entries(patterns).map(([name, pattern]) => (
            <Button key={name} onClick={() => onPattern(pattern)}>
              {name}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
};
