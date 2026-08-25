import { defineApp } from "convex/server";
import staticHosting from "@convex-dev/static-hosting/convex.config";

// This app has no backend functions of its own — static-hosting is the only
// component, so it can own the whole root instead of moving under /api.
const app = defineApp();
app.use(staticHosting, { httpPrefix: "/" });

export default app;
