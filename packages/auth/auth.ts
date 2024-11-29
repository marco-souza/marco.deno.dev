import { assert, raise } from "@m3o/errors";

export const configs = {
  authUrl: "https://github.com/login/oauth",
  urls: {
    signIn: "/api/auth",
    signOut: "/api/auth/logout",
    refresh: "/api/auth/refresh",
    callback: "/api/auth/callback",
  },
  credentials: {
    scope: "read:user user:email",
    client_id: Deno.env.get("GITHUB_CLIENT_ID") || "client_id",
    client_secret: Deno.env.get("GITHUB_CLIENT_SECRET") || "client_secret",
  },
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
};

type Credentials = typeof configs["credentials"];

type AccessToken = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  token_type: string;
  scope: string;
};

type AccessTokenError = {
  error: string;
  error_uri?: string;
  error_description?: string;
};

// TODO: Checklist
// - [ ] improve typing from configs
// - [ ] make a class to share configs
// - [ ] check for valid state
// - [ ] store state in a database

export function generateRedirectUrl(origin: string): string {
  const state = createState();
  const oAuthUrl = new URL(configs.authUrl + "/authorize");
  const redirectUri = `${origin}${configs.urls.callback}`;

  oAuthUrl.searchParams.append("client_id", configs.credentials.client_id);
  oAuthUrl.searchParams.append("scope", configs.credentials.scope);
  oAuthUrl.searchParams.append("redirect_uri", redirectUri);
  oAuthUrl.searchParams.append("response_type", "code");
  oAuthUrl.searchParams.append("state", state);

  return oAuthUrl.toString();
}

type FetchAccessToken = Credentials & {
  code: string;
};

export async function fetchAccessToken(
  code: string,
  state: string,
): Promise<AccessToken> {
  assert(isValidState(state), "Invalid state");

  const body: FetchAccessToken = {
    ...configs.credentials,
    code,
  };

  const accessToken = await requestAccessToken(JSON.stringify(body));
  return accessToken;
}

type RefreshAccessToken = Credentials & {
  refresh_token: string;
  grant_type: "refresh_token";
};

export async function refreshAccessToken(
  refreshToken: string,
): Promise<AccessToken> {
  assert(refreshToken.length > 0, "Invalid refresh token");

  const body: RefreshAccessToken = {
    ...configs.credentials,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  };

  const accessToken = await requestAccessToken(JSON.stringify(body));
  return accessToken;
}

async function requestAccessToken(body: string) {
  const accessTokenUrl = configs.authUrl + "/access_token";
  const response = await fetch(accessTokenUrl, {
    method: "POST",
    headers: configs.headers,
    body,
  });
  const accessToken = await response.json();

  if (!response.ok || accessToken.error) {
    const error = accessToken as AccessTokenError;
    const message = `fetch error: ${
      error.error ?? `Status code: ${response.status}`
    }`;
    raise(message);
  }

  return accessToken as AccessToken;
}

function createState(): string {
  return Math.random().toString(36).substring(7);
}

function isValidState(state: string): boolean {
  return state.length > 0;
}
