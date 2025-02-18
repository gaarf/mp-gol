import { Button } from "@/components/Button.tsx";
import { useCallback } from "@/hooks.ts";
import { toast } from "@/utils.ts";

export const GameOfLife = () => {

  const handleClick = useCallback(() => {
    toast.success("Hello from GameOfLife");
  }, []);

  return (
    <div class="p-2 flex gap-2 items-center justify-around">
      GameOfLife island here
      <Button onClick={handleClick} intent="warning">Click me</Button>
    </div>
  );
}