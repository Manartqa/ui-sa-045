import { ImportRequestA4Content } from "@/components/partials/ImportRequestA4";

/** In Next 15 route params arrive as a promise. */
export default async function ImportWeaponA4DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ImportRequestA4Content id={id} />;
}
