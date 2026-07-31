import MockDocumentViewer from "@/components/partials/MockDocument/MockDocumentViewer";

/**
 * Stand-in for the document store. Nothing is ever uploaded anywhere in this
 * demo, so "ดูหลักฐาน" opens this page in a new tab instead of a fabricated
 * PDF — the tab proves the link fired and names the file it would have served.
 *
 * It sits outside `(admin)` on purpose: a new tab should not carry the app
 * chrome, and the route is replaced by the real file URL once storage exists.
 */
export default async function MockDocumentPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; title?: string }>;
}) {
  const { name, title } = await searchParams;
  return <MockDocumentViewer fileName={name ?? ""} title={title ?? ""} />;
}
