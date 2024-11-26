const configs = {
  authUrl: "https://github.com/login/oauth",
  urls: {
    signIn: "/api/auth",
    logout: "/api/auth/logout",
    refresh: "/api/auth/refresh",
    callback: "/api/auth/callback",
  },
  credentials: {
    scope: "read:user user:email",
    client_id: Deno.env.get("GITHUB_CLIENT_ID") || "client_id",
    client_secret: Deno.env.get("GITHUB_CLIENT_SECRET") || "client_secret",
  },
};

type AccessCode = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

// TODO: make a class to share configs

// TODO: generate redirect link
export function generateRedirectUrl(origin: string) {
  const oAuthUrl = new URL(configs.authUrl + "/authorize");
  const state = Math.random().toString(36).substring(7);
  const redirectUri = `${origin}${configs.urls.callback}`;

  oAuthUrl.searchParams.append("client_id", configs.credentials.client_id);
  oAuthUrl.searchParams.append("scope", configs.credentials.scope);
  oAuthUrl.searchParams.append("redirect_uri", redirectUri);
  oAuthUrl.searchParams.append("response_type", "code");
  oAuthUrl.searchParams.append("state", state);

  const redirectUrl = oAuthUrl.toString().replaceAll("+", "%20");
  return redirectUrl;
}

// TODO: fetch auth code
export async function fetchAuthToken(code: string) {
  const accessTokenUrl = configs.authUrl + "/access_token";
  const response = await fetch(accessTokenUrl, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...configs.credentials,
      code,
    }),
  });
  const accessCode = await response.json() as AccessCode;

  return accessCode;
}
// TODO: fetch auth token from code
// TODO: refresh token
