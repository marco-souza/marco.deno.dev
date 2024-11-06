import { Hono } from "hono";

const app = new Hono();

// Import all routes from the pages directory
const routesDir = Deno.env.get("ROUTES_DIR") || "./routes";

try {
  for await (const page of Deno.readDir(routesDir)) {
    const { definePage } = await import(`./${routesDir}/${page.name}`);
    const routePath = processPageRoute(page.name);

    definePage(app);
    console.log(`Registered route: /${routePath}`);
  }

  Deno.serve(app.fetch);
} catch (e) {
  console.error("E: Unhandled error:", e);
}

function processPageRoute(page: string) {
  if (page.trim().length === 0) return "/";

  return page
    .toLowerCase()
    .replace(/\.tsx?/, "")
    .replace("index", "");
}
