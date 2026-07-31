import dayjs, { type Dayjs } from "dayjs";

/**
 * Date helpers for the Thai calendar. The UI writes and reads พ.ศ. while every
 * value we hold in state or hand to a service is ISO ค.ศ.
 */

/** ISO (ค.ศ.) → "DD/MM/พ.ศ." as the tables render it. Invalid input → "". */
export function toThaiDate(iso?: string | null): string {
  if (!iso) return "";
  const d = dayjs(iso);
  if (!d.isValid()) return "";
  return `${d.format("DD/MM")}/${d.year() + 543}`;
}

/** ISO (ค.ศ.) → "DD/MM/พ.ศ. HH:mm" for the log and the header timestamps. */
export function toThaiDateTime(iso?: string | null): string {
  if (!iso) return "";
  const d = dayjs(iso);
  if (!d.isValid()) return "";
  return `${d.format("DD/MM")}/${d.year() + 543} ${d.format("HH:mm")}`;
}

/** "04/01/2572" (พ.ศ., ค.ศ. also accepted) → dayjs. */
export function thaiDateToDayjs(value: string): Dayjs {
  const [dd, mm, yy] = value.split("/").map(Number);
  const year = yy > 2400 ? yy - 543 : yy;
  return dayjs(new Date(year, mm - 1, dd));
}

/** dayjs → ISO ค.ศ. for the service layer; empty when the value is unset. */
export function toIsoDate(d?: Dayjs | null): string {
  return d?.isValid() ? d.format("YYYY-MM-DD") : "";
}
