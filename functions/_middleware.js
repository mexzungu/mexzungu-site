/**
 * Cloudflare Pages middleware. Runs on every request across all hostnames.
 * Job: route branded subdomains (olc, aistudio) to their subtree without
 * exposing the path externally, while leaving mexzungu.com and other hostnames
 * untouched.
 *
 * Placed first in the middleware chain. Downstream middlewares
 * (collaborators, jouissance-auth, pp-auth, etc.) run only after this passes.
 */

const SUBDOMAIN_ROUTES = {
    "olc.mexzungu.com": "/olc",
    "aistudio.mexzungu.com": "/aistudio",
};

const SHARED_ASSETS = new Set([
    "/favicon.ico",
    "/apple-touch-icon.png",
    "/robots.txt",
    "/sitemap.xml",
    "/fonts.css",
]);

export async function onRequest(context) {
    const { request, next, env } = context;
    const url = new URL(request.url);

    const subtree = SUBDOMAIN_ROUTES[url.hostname];
    if (subtree) {
        // Do not rewrite the /api/* namespace. CF Pages Functions live there.
        if (url.pathname.startsWith("/api/")) return next();

        // Shared assets served from the repo root (favicon, robots, images, fonts).
        if (SHARED_ASSETS.has(url.pathname)) return next();
        if (url.pathname.startsWith("/img/")) return next();
        if (url.pathname.startsWith("/fonts/")) return next();

        // Rewrite to <subtree>/<path> and re-issue if not already scoped.
        if (!url.pathname.startsWith(subtree + "/") && url.pathname !== subtree) {
            const rewritten = new URL(url);
            rewritten.pathname = subtree + (url.pathname === "/" ? "/" : url.pathname);
            return env.ASSETS.fetch(new Request(rewritten.toString(), request));
        }
    }

    return next();
}
