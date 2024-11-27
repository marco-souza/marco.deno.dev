import { assertIsError, assertStringIncludes } from "@std/assert";
import { fetchAuthToken, generateRedirectUrl } from "./auth.ts";

Deno.test(function redirectUrlTest() {
  const origin = "http://localhost:3000";
  const redirectUrl = generateRedirectUrl(origin);

  assertStringIncludes(redirectUrl, "client_id");
  assertStringIncludes(redirectUrl, "callback");

  const params = new URLSearchParams();
  params.append("redirect_uri", `${origin}/api/auth/callback`);
  assertStringIncludes(redirectUrl, params.toString());
});

const code = "code";
const state = "any";

Deno.test("fetch accessToken with invalid code", async () => {
  await fetchAuthToken(code, state).catch((error) => {
    assertIsError(error);
  });
});

Deno.test("throw an error if state is invalid", async () => {
  const invalidState = "";

  await fetchAuthToken(code, invalidState).catch((error) => {
    assertIsError(error);
    assertStringIncludes(error.message, "Invalid state");
  });
});
