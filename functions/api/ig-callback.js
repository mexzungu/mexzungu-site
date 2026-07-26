const APP_ID     = "790572287045953";
const APP_SECRET = "ad0e3ff5610c2fd2381007c73fab878e";
const REDIRECT   = "https://mexzungu.com/api/ig-callback";

export async function onRequest(context) {
  const { request } = context;
  const url  = new URL(request.url);
  const code  = url.searchParams.get("code");
  const error = url.searchParams.get("error_description") || url.searchParams.get("error");

  if (error) {
    return html(`<h2 style="color:red">Error</h2><pre>${error}</pre>`);
  }

  if (!code) {
    return html(`<h2 style="color:#E14B87">Waiting for Instagram login...</h2><p>Nothing here yet.</p>`);
  }

  // Step 1: exchange code for short-lived token
  const body = new URLSearchParams({
    client_id:     APP_ID,
    client_secret: APP_SECRET,
    grant_type:    "authorization_code",
    redirect_uri:  REDIRECT,
    code:          code,
  });

  let shortToken, userId;
  try {
    const r1 = await fetch("https://api.instagram.com/oauth/access_token", {
      method:  "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:    body.toString(),
    });
    const d1 = await r1.json();
    if (!d1.access_token) {
      return html(`<h2 style="color:red">Token exchange failed</h2><pre>${JSON.stringify(d1, null, 2)}</pre>`);
    }
    shortToken = d1.access_token;
    userId     = d1.user_id;
  } catch (e) {
    return html(`<h2 style="color:red">Exchange error</h2><pre>${e}</pre>`);
  }

  // Step 2: exchange for long-lived token (60 days)
  const r2 = await fetch(
    `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${APP_SECRET}&access_token=${shortToken}`
  );
  const d2 = await r2.json();

  const finalToken = d2.access_token || shortToken;
  const expiry     = d2.expires_in ? `${Math.round(d2.expires_in / 86400)} days` : "short-lived only";

  return html(`
    <h1 style="color:#E14B87">Instagram Token Ready</h1>
    <p><b>User ID:</b> ${userId}</p>
    <p><b>Expires:</b> ${expiry}</p>
    <p><b>Token (copy this):</b></p>
    <textarea rows="5" style="width:100%;font-size:13px;padding:8px" onclick="this.select()">${finalToken}</textarea>
    <br><br>
    <button onclick="navigator.clipboard.writeText('${finalToken}').then(()=>alert('Copied!'))">Copy Token</button>
  `);
}

function html(body) {
  return new Response(
    `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:800px;margin:40px auto;padding:20px;background:#0d0d0d;color:#fafafa">${body}</body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
