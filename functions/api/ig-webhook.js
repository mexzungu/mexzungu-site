const VERIFY_TOKEN = "mexzungu_ig_janis_2026";

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  if (request.method === "GET") {
    const mode      = url.searchParams.get("hub.mode");
    const token     = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return new Response(challenge, { status: 200 });
    }
    return new Response("Forbidden", { status: 403 });
  }

  if (request.method === "POST") {
    return new Response("OK", { status: 200 });
  }

  return new Response("Method Not Allowed", { status: 405 });
}
