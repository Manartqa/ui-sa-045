import { redirect } from "next/navigation";

/** A request is always viewed by id now — bare `/import-weapon-a4` is the list. */
export default function ImportWeaponA4Page() {
  redirect("/request/import-weapon-a4/list");
}
