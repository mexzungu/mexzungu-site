/**
 * Cloudflare Pages middleware. Runs on every request across all hostnames.
 * Job: route olc.mexzungu.com to the /olc/ subtree without exposing the path
 * externally, while leaving mexzungu.com and all other hostnames untouched.
 *
 * Placed first in the middleware chain. Downstream middlewares
 * (collaborators, jouissance-auth, pp-auth, etc.) run only after this passes.
 */

export async function onRequest(context) {
    const { request, next, env } = context;
    const url = new URL(request.url);

    if (url.hostname === "olc.mexzungu.com") {
        // Do not rewrite the /api/* namespace. CF Pages Functions live there.
        if (url.pathname.startsWith("/api/")) return next();

        // Do not rewrite assets that live at the repo root and are shared
        // (favicon, robots, sitemap, static images).
        const passThrough = [
            "/favicon.ico",
            "/apple-touch-icon.png",
            "/robots.txt",
            "/sitemap.xml",
            "/fonts.css",
        ];
        if (passThrough.includes(url.pathname)) return next();
        if (url.pathname.startsWith("/img/")) return next();
        if (url.pathname.startsWith("/fonts/")) return next();

        // Otherwise, rewrite the URL to /olc/<path> and re-issue.
        if (!url.pathname.startsWith("/olc/")) {
            const rewritten = new URL(url);
            rewritten.pathname = "/olc" + (url.pathname === "/" ? "/" : url.pathname);
            // Preserve query + hash by URL constructor.
            return env.ASSETS.fetch(new Request(rewritten.toString(), request));
        }
    }

    return next();
}
