import type { DiscographyEntry } from "./discography-entry";
import { getVideoUrl } from "./search";

export const render = (
  tagName: string,
  content: string | HTMLElement = "",
  attrs: Record<string, string> = {}
): HTMLElement => {
  const element = document.createElement(tagName);
  if (typeof content === "string") {
    element.textContent = content;
  } else {
    element.appendChild(content);
  }
  Object.entries(attrs).forEach(([attr, val]) =>
    element.setAttribute(attr, val)
  );
  return element;
};

export async function buildResultElement({
  Song: song,
  Album: album,
  Composer: composer,
  Singer: singer,
}: DiscographyEntry): Promise<HTMLElement> {
  const template = document.getElementById(
    "search-result"
  ) as HTMLTemplateElement;
  const resultElement = template.content.cloneNode(true) as HTMLElement;

  const videoUrl = await getVideoUrl(song);
  if (videoUrl) {
    resultElement.querySelector(".video")!.setAttribute("src", videoUrl);
  } else {
    resultElement.querySelector(".video")!.remove();
  }

  resultElement.querySelector(".song")!.textContent = song;
  resultElement.querySelector(".album-name")!.textContent = album;
  resultElement.querySelector(".composer-name")!.textContent = composer;
  resultElement.querySelector(".singer-name")!.textContent = singer;

  return resultElement;
}
