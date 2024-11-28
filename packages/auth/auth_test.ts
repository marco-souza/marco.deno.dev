import { assertIsError, assertStringIncludes } from "@std/assert";
import {
  fetchAccessToken,
  generateRedirectUrl,
  refreshAccessToken,
} from "./auth.ts";

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
  await fetchAccessToken(code, state).catch((error) => {
    assertIsError(error);
  });
});

Deno.test("throw an error if state is invalid", async () => {
  const invalidState = "";

  await fetchAccessToken(code, invalidState).catch((error) => {
    assertIsError(error);
    assertStringIncludes(error.message, "Invalid state");
  });
});

Deno.test("throw an error if refresh an invalid token", async () => {
  const refreshToken = "";
  await refreshAccessToken(refreshToken).catch((error) => {
    assertIsError(error);
  });
});

Deno.test("throw an error if refresh token is invalid", async () => {
  const refreshToken = "valid-token";
  await refreshAccessToken(refreshToken).catch((error) => {
    assertIsError(error);
  });
});