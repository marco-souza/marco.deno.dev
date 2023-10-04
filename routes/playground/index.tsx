import { defineRoute } from "$fresh/server.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";

export default defineRoute(() => {
  return (
    <div class="max-w-2xl px-8 mx-auto mx-8">
      <div class="flex flex-col gap-10 my-8 xl:my-16 2xl:my-32 items-center text-center">
        <h1 className="text-2xl">Playground</h1>

        <button
          hx-get="/api/click"
          hx-swap="innerHTML"
          hx-target=".output"
          hx-indicator="#indicator"
          class="btn btn-secondary"
        >
          Click Me
        </button>

        <div id="indicator" class="htmx-indicator loading loading-spinner" />

        <code class="output"></code>
      </div>
    </div>
  );
});
