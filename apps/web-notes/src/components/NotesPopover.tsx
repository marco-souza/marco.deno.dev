import type { Component } from "solid-js";

import { Popover } from "@kobalte/core/popover";

import clippyJump from "@/static/clippy-jump.gif";
import { note, setContent } from "@/domain/note";

const PopoverBody: Component = () => {
  return (
    <textarea
      class="w-full h-36 text-xs p-2 rounded-md bg-gray-200"
      value={note().content}
      placeholder="Write your notes here..."
      onInput={(e) => setContent((e.target as HTMLTextAreaElement).value)}
    />
  );
};

const PopoverHeader: Component = () => {
  return (
    <div class="flex gap-4 align-middle justify-between">
      <Popover.Title class="text-md font-medium">📝 Page Notes</Popover.Title>

      <div>
        <Popover.CloseButton class="btn btn-ghost btn-xs" title="Close">
          X
        </Popover.CloseButton>
      </div>
    </div>
  );
};

const PopoverIcon: Component = () => {
  return <img src={clippyJump} alt="Page Notes" class="h-16" />;
};

export { PopoverBody, PopoverHeader, PopoverIcon };
