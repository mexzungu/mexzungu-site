// Mexzungu Research Hub - Auth Module
// Password: outlaw2026 (SHA-256 hashed)
// This file is reference only. Copy inline into each page (no ES module imports on Cloudflare Pages static)

const RESEARCH_PASSWORD_HASH = "e57d542aab100cbe0fbad00a6e50aaca50a1d7634e80115a3b54ea44333317a4";
const STORAGE_KEY = "mexzungu_research_auth";

async function sha256(message) {
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(message));
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function checkAuth() {
  return localStorage.getItem(STORAGE_KEY) === 'true';
}

function setAuth() {
  localStorage.setItem(STORAGE_KEY, 'true');
}
