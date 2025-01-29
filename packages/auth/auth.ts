import { assert, raise } from "@m3o/errors";

type Credentials = {
  client_id: string;
  client_secret: string;
  scope: string;
};

export type AccessToken = {
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

type FetchAccessToken = Credentials & {
  code: string;
};

type RefreshAccessToken = Credentials & {
  refresh_token: string;
  grant_type: "refresh_token";
};

type GithubUserResponse = Record<string, unknown>;

export class GitHubAuth {
  urls = {
    signIn: "/api/auth",
    signOut: "/api/auth/logout",
    refresh: "/api/auth/refresh",
    callback: "/api/auth/callback",
  };

  private validStates: Set<string> = new Set();

  private authUrl = "https://github.com/login/oauth";
  private headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
  };

  constructor(private credentials: Credentials) {}

  setUrls(urls: Partial<GitHubAuth["urls"]>) {
    this.urls = { ...this.urls, ...urls };
  }

  generateAuthUrl(origin: string): string {
    const state = this.createState();
    const oAuthUrl = new URL(this.authUrl + "/authorize");
    const redirectUri = `${origin}${this.urls.callback}`;

    oAuthUrl.searchParams.append("client_id", this.credentials.client_id);
    oAuthUrl.searchParams.append("scope", this.credentials.scope);
    oAuthUrl.searchParams.append("redirect_uri", redirectUri);
    oAuthUrl.searchParams.append("response_type", "code");
    oAuthUrl.searchParams.append("state", state);

    return oAuthUrl.toString();
  }

  async fetchAccessToken(code: string): Promise<AccessToken> {
    const body: FetchAccessToken = { ...this.credentials, code };

    return await this.requestAccessToken(JSON.stringify(body));
  }

  async fetchUser(
    accessToken: string,
    username = "me",
  ): Promise<GithubUserResponse> {
    const userUrl = `https://api.github.com/users/${username}`;
    const response = await fetch(userUrl, {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    assert(response.ok, `fetch error: Status code: ${response.status}`);

    return await response.json();
  }

  async refreshAccessToken(refreshToken: string): Promise<AccessToken> {
    assert(refreshToken.length > 0, "Invalid refresh token");

    const body: RefreshAccessToken = {
      ...this.credentials,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    };

    return await this.requestAccessToken(JSON.stringify(body));
  }

  private async requestAccessToken(body: string) {
    const accessTokenUrl = this.authUrl + "/access_token";
    const response = await fetch(accessTokenUrl, {
      method: "POST",
      headers: this.headers,
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

  private createState(): string {
    const state = Math.random().toString(36).substring(7);

    // TODO: set a timeout to remove the state

    this.validStates.add(state);
    return state;
  }

  isValidState(state: string): boolean {
    if (state.trim().length === 0) return false;
    if (!this.validStates.has(state)) return false;

    this.validStates.delete(state);
    return true;
  }
}
