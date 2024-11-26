import { assertStringIncludes } from "@std/assert";
import { generateRedirectUrl } from "./auth.ts";

Deno.test(function redirectUrlTest() {
  const origin = "http://localhost:3000";
  const redirectUrl = generateRedirectUrl(origin);

  assertStringIncludes(redirectUrl, "client_id");
  assertStringIncludes(redirectUrl, "callback");

  const params = new URLSearchParams();
  params.append("redirect_uri", `${origin}/api/auth/callback`);
  assertStringIncludes(redirectUrl, params.toString());
});
