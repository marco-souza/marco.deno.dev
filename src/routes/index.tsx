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
  return (
    <Layout>
      <h1>Hello Hono!</h1>
      <ul>
        {props.messages.map((message) => {
          return <li>{message}!!</li>;
        })}
      </ul>

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
    return ctx.html(<Top messages={messages} />);
  });

  app.post("/clicked", (ctx: Context) => {
    const now = Date.now();
    console.log("POST /clicked", now);
    return ctx.html(<p class="bg-red-800">Clicked now: {now}</p>);
  });
}
