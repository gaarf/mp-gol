import { type IconProps, ToastContainer } from "react-toastify";
import { type Intent, useTheme } from "@/theme/index.ts";
import { IntentIcon } from "@/components/Icon.tsx";
import { IS_BROWSER, toast } from "@/utils.ts";
import { useEffect, useState } from "@/hooks.ts";

const ToastIcon = ({ type }: IconProps) => {
  const intent = {
    default: null,
    error: "danger",
    info: "accent",
    success: "success",
    warning: "warning",
  }[type];

  return intent && <IntentIcon intent={intent as Intent} />;
};

export const Toaster = () => {
  if (!IS_BROWSER) return null;

  const [theme] = useTheme();

  const [last, setLast] = useState(theme);
  useEffect(() => {
    if (theme !== last) {
      toast.dismiss();
      setLast(theme);
    }
  }, [last, theme]);

  return (
    <ToastContainer position="bottom-right" theme={theme} icon={ToastIcon} />
  );
};
