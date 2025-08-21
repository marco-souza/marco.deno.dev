import { assert, assertIsError, assertStringIncludes } from "@std/assert";
import { GitHubAuth } from "./auth.ts";

export const auth: GitHubAuth = new GitHubAuth({
  scope: "read:user user:email",
  client_id: Deno.env.get("GITHUB_CLIENT_ID") || "client_id",
  client_secret: Deno.env.get("GITHUB_CLIENT_SECRET") || "client_secret",
});

Deno.test(function redirectUrlTest() {
  const origin = "http://localhost:3000";
  const redirectUrl = auth.generateAuthUrl(origin);

  assertStringIncludes(redirectUrl, "client_id");
  assertStringIncludes(redirectUrl, "callback");

  const params = new URLSearchParams();
  params.append("redirect_uri", `${origin}/api/auth/callback`);
  assertStringIncludes(redirectUrl, params.toString());
});

const code = "code";

Deno.test("fetch accessToken with invalid code", async () => {
  await auth.fetchAccessToken(code, null).catch((error) => {
    assertIsError(error);
  });
});

Deno.test("not throw an error if state is valid", () => {
  const url = new URL(
    // generate state
    auth.generateAuthUrl("http://localhost:3000"),
  );

  const state = url.searchParams.get("state") || "";
  assert(auth.isValidState(state), "State is invalid");
});

Deno.test("throw an error if state is invalid", () => {
  const invalidState = "";
  assert(!auth.isValidState(invalidState), "State is invalid");
});

Deno.test("throw an error if refresh an invalid token", async () => {
  const refreshToken = "";
  await auth.refreshAccessToken(refreshToken).catch((error) => {
    assertIsError(error);
  });
});

Deno.test("throw an error if refresh token is invalid", async () => {
  const refreshToken = "valid-token";
  await auth.refreshAccessToken(refreshToken).catch((error) => {
    assertIsError(error);
  });
});
