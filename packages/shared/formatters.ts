import { site } from "~/settings.ts";

export function parseBioText(text: string | undefined): string {
  if (text == null) return "";

  const tagRegex = /\@(\w*)/g;
  const linksMap: Map<string, string> = new Map(Object.entries(site.links));

  const result = text.replace(tagRegex, (originalText, name: string) => {
    const link = linksMap.get(name);

    if (link) {
      return `<a class="text-pink-400" target="blank" href="${link}">${originalText}</a>`;
    }
    return originalText;
  });

  return result;
}
