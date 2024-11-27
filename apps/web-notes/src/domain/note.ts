import { createSignal } from "solid-js";

export type Note = {
  name: string;
  content: string;
};

function getPageKey() {
  return `notes:${location.host}${location.pathname}`;
}

const [note, setNote] = createSignal<Note>({
  name: "Page Notes",
  content: localStorage.getItem(getPageKey()) ?? "",
});

const setContent = (content: string) => {
  setNote((prev) => ({ ...prev, content }));

  localStorage.setItem(getPageKey(), content);
};

export { note, setContent };
