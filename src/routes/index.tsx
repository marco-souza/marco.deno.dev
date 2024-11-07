import { Context, Hono } from "hono";
import { FC } from "hono/jsx";

const Layout: FC = (props) => {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <script src="/static/js/htmx.min.js"></script>

        <title>Hello Hono!</title>

        <link rel="stylesheet" href="/static/css/styles.min.css" />
      </head>

      <body>{props.children}</body>
    </html>
  );
};

const Top: FC<{ messages: string[] }> = (props: {
  messages: string[];
}) => {
  function toggleTheme() {
    const htmlElement = document.documentElement;
    const systemTheme =
      globalThis.matchMedia("(prefers-color-scheme: light)")?.matches
        ? "light"
        : "dark";

    const selectedTheme = htmlElement.dataset.theme ?? systemTheme;

    htmlElement.dataset.theme = selectedTheme === "dark" ? "light" : "dark";
  }

  return (
    <Layout>
      <h1>Hello Hono!</h1>

      <ul>
        {props.messages.map((message) => {
          return <li>{message}!!</li>;
        })}
      </ul>

      <h1>Toggle Dark Mode</h1>
      <button
        id="toggle-theme"
        class="btn btn-primary"
        onClick={toggleTheme}
      >
        Toggle Theme
      </button>

      <button
        hx-post="/clicked"
        hx-trigger="click"
        hx-swap="outerHTML"
        class="btn btn-outlined"
      >
        Click Me!
      </button>
    </Layout>
  );
};

export function definePage(app: Hono) {
  app.get("/", (ctx: Context) => {
    console.log("GET /");
    const messages = ["Good Morning", "Good Evening", "Good Night"];
    return ctx.render(<Top messages={messages} />);
  });

  app.post("/clicked", (ctx: Context) => {
    const now = Date.now();
    console.log("POST /clicked", now);
    return ctx.render(
      <p class="rounded-full p-4 bg-red-800">Clicked now: {now}</p>,
    );
  });
}
