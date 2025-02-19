import { Button, ButtonGroup } from "@/components/index.ts";
import { type PropsWithChildren } from "@/types.ts";

type ControlsProps = PropsWithChildren<{
  onPattern: (pattern: string) => void;
}>;

const patterns = {
  Blinker: `
.■■■.
`,
  Toad: `
..■■■.
.■■■..
`,
  Beacon: `
.■■...
.■■...
...■■.
...■■.
`,
  Glider: `
..■..
...■.
.■■■.
`,
  LWSS: `
..■..■.
.■.....
.■...■.
.■■■■..
`,
};

export const Controls = ({ onPattern }: ControlsProps) => {
  return (
    <div class="flex justify-center mb-4">
      <ButtonGroup>
        {Object.entries(patterns).map(([name, pattern]) => (
          <Button key={name} onClick={() => onPattern(pattern)}>
            {name}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};
