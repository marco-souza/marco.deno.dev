import { configs } from "@m3o/auth";

export function LoginPage({ errors = "", username = "" }) {
  return (
    <div class="card shadow-md max-w-96 mx-auto">
      <div class="card-body">
        <h1 class="text-2xl">Login</h1>

        <form
          class="grid gap-4"
          action={configs.urls.signIn}
          hx-boost="false"
        >
          <input
            type="text"
            name="username"
            value={username}
            class="input input-bordered w-full"
            placeholder="Enter your username"
            autofocus
            required
          />

          <button class="btn btn-primary w-full" type="submit">Login</button>
        </form>

        {errors && <p class="text-red-500">{errors}</p>}
      </div>
    </div>
  );
}
