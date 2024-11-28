import { configs } from "@m3o/auth";

export function LoginPage({ errors = "", username = "" }) {
  return (
    <div class="card shadow-md">
      <div class="card-body">
        <h1 class="text-2xl">Login</h1>

        <form
          class="flex gap-4"
          action={configs.urls.signIn}
          hx-boost="false"
        >
          <input
            type="text"
            name="username"
            value={username}
            class="input input-bordered flex-1"
            placeholder="Enter your username"
            autofocus
            required
          />

          <button class="btn btn-primary" type="submit">Login</button>
        </form>

        {errors && <p class="text-red-500">{errors}</p>}
      </div>
    </div>
  );
}
