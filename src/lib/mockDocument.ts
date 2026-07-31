/** Route the demo opens in place of a stored file. */
export const MOCK_DOCUMENT_PATH = "/mock/document";

/**
 * Opens an attached file in a new tab. Callers must gate this on the row
 * actually having a file — an empty `fileName` means there is nothing to show.
 */
export function openMockDocument(fileName: string, title?: string) {
  const params = new URLSearchParams({ name: fileName });
  if (title) params.set("title", title);
  window.open(`${MOCK_DOCUMENT_PATH}?${params.toString()}`, "_blank");
}
