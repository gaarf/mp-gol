import { Button, Icon } from "@/components/index.ts";
import { useTheme } from "@/theme/index.ts";

type SwitchProps = {
  class?: string;
};

export const Switch = ({ class: className }: SwitchProps) => {
  const [theme, toggleTheme] = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      class={className}
    >
      {theme === "dark" ? <Icon.ThemeLight /> : <Icon.ThemeDark />}
    </Button>
  );
};
