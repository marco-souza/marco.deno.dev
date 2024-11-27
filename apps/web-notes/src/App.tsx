import type { Component } from "solid-js";

import { Popover } from "@kobalte/core/popover";
import {
  PopoverBody,
  PopoverHeader,
  PopoverIcon,
} from "./components/NotesPopover";

const App: Component = () => {
  return (
    <Popover>
      <Popover.Trigger>
        <PopoverIcon />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content class="z-50 rounded-md p-2 flex flex-col gap-4 bg-gray-100 shadow-xl">
          <Popover.Arrow />

          <PopoverHeader />

          <Popover.Description class="grid gap-2">
            <PopoverBody />
          </Popover.Description>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
};

export default App;
