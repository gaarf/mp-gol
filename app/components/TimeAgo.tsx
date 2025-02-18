import { DateTime, type PropsWithChildren } from "@/utils.ts";
import {
  type DurationUnits,
  type ToHumanDurationOptions,
} from "npm:@types/luxon";

type TimeAgoProps = PropsWithChildren<{
  when?: string;
  className?: string;
  unit?: DurationUnits;
  options?: ToHumanDurationOptions;
}>;

export const TimeAgo = ({
  when = DateTime.now().toISO(),
  children,
  unit = [],
  options = { useGrouping: true, maximumFractionDigits: 0 },
  className,
}: TimeAgoProps) => {
  const base = DateTime.fromISO(when);
  let units: DurationUnits = unit.length ? unit : [];
  if (!units.length) {
    const { hours } = base.diffNow("hours").negate();
    if (hours < 1) {
      units = "minutes";
    } else if (hours < 24) {
      units = "hours";
    } else {
      units = "days";
    }
  }

  return (
    <time dateTime={when} className={className}>
      {base.diffNow(units).negate().toHuman(options)}
      {children || " ago"}
    </time>
  );
};
