import { toPng } from "html-to-image";

export async function downloadElementAsImage(
  element: HTMLElement,
  fileName: string = "download.png"
) {
  if (!element) return;

  const dataUrl = await toPng(element);
  const link = document.createElement("a");
  link.download = fileName;
  link.href = dataUrl;
  link.click();
}
