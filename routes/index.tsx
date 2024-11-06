import { Context, Hono } from "hono";
import { FC } from "hono/jsx";

const Layout: FC = (props) => {
  return (
    <html>
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
    </Layout>
  );
};

export function definePage(app: Hono) {
  app.get("/", (ctx: Context) => {
    console.log("GET /");
    const messages = ["Good Morning", "Good Evening", "Good Night"];
    return ctx.html(<Top messages={messages} />);
  });
}
