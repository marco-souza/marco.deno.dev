import type { PropsWithChildren } from "hono/jsx";
import { configs } from "~/constants.ts";

type Props = PropsWithChildren<{
  uploadedFiles: Array<string>;
}>;

export function MusicPage(props: Props) {
  return (
    <div class="grid gap-4">
      <h1 class="text-2xl">Add a music to my DJ playlist</h1>

      <div class="card-actions justify-center">
        <form
          hx-target="body"
          hx-post={configs.navigation.downloadMusic}
          class="w-full grid gap-4"
        >
          <div class="form-group">
            <label for="vault-name">Enter a YouTube link</label>

            <input
              type="text"
              name="link"
              class="input input-bordered w-full"
              placeholder="Enter a YouTube URL"
              autofocus
              required
            />
          </div>

          <button type="submit" class="btn btn-secondary btn-outline w-full">
            🎥 Send video
          </button>
        </form>
      </div>

      <ul>
        {props.uploadedFiles.map((file) => <li key={file}>{file}</li>)}
      </ul>
    </div>
  );
}

export function MusicSuccessPage() {
  return (
    <div class="grid gap-4">
      <h1 class="text-2xl">Add a music to my DJ playlist</h1>

      <p>Download successfully started! ✅</p>
    </div>
  );
}
