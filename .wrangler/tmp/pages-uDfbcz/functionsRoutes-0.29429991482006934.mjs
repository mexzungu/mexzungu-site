import { onRequestOptions as __api_temp_check_alert_js_onRequestOptions } from "/home/mexzungu/mexzungu-site/functions/api/temp-check/alert.js"
import { onRequestPost as __api_temp_check_alert_js_onRequestPost } from "/home/mexzungu/mexzungu-site/functions/api/temp-check/alert.js"
import { onRequestOptions as __api_temp_check_heartbeat_js_onRequestOptions } from "/home/mexzungu/mexzungu-site/functions/api/temp-check/heartbeat.js"
import { onRequestPost as __api_temp_check_heartbeat_js_onRequestPost } from "/home/mexzungu/mexzungu-site/functions/api/temp-check/heartbeat.js"
import { onRequestGet as __api_temp_check_latest_js_onRequestGet } from "/home/mexzungu/mexzungu-site/functions/api/temp-check/latest.js"
import { onRequestOptions as __api_temp_check_latest_js_onRequestOptions } from "/home/mexzungu/mexzungu-site/functions/api/temp-check/latest.js"
import { onRequestOptions as __api_temp_check_log_js_onRequestOptions } from "/home/mexzungu/mexzungu-site/functions/api/temp-check/log.js"
import { onRequestPost as __api_temp_check_log_js_onRequestPost } from "/home/mexzungu/mexzungu-site/functions/api/temp-check/log.js"
import { onRequestGet as __api_rate___path___js_onRequestGet } from "/home/mexzungu/mexzungu-site/functions/api/rate/[[path]].js"
import { onRequestOptions as __api_rate___path___js_onRequestOptions } from "/home/mexzungu/mexzungu-site/functions/api/rate/[[path]].js"
import { onRequestPost as __api_rate___path___js_onRequestPost } from "/home/mexzungu/mexzungu-site/functions/api/rate/[[path]].js"
import { onRequest as __api_jouissance_auth___path___js_onRequest } from "/home/mexzungu/mexzungu-site/functions/api/jouissance-auth/[[path]].js"
import { onRequest as __api_pp_auth___path___js_onRequest } from "/home/mexzungu/mexzungu-site/functions/api/pp-auth/[[path]].js"
import { onRequestOptions as __api_duara_audit_js_onRequestOptions } from "/home/mexzungu/mexzungu-site/functions/api/duara-audit.js"
import { onRequestPost as __api_duara_audit_js_onRequestPost } from "/home/mexzungu/mexzungu-site/functions/api/duara-audit.js"
import { onRequestOptions as __api_duara_chat_js_onRequestOptions } from "/home/mexzungu/mexzungu-site/functions/api/duara-chat.js"
import { onRequestPost as __api_duara_chat_js_onRequestPost } from "/home/mexzungu/mexzungu-site/functions/api/duara-chat.js"
import { onRequestGet as __api_duara_save_js_onRequestGet } from "/home/mexzungu/mexzungu-site/functions/api/duara-save.js"
import { onRequestOptions as __api_duara_save_js_onRequestOptions } from "/home/mexzungu/mexzungu-site/functions/api/duara-save.js"
import { onRequestPost as __api_duara_save_js_onRequestPost } from "/home/mexzungu/mexzungu-site/functions/api/duara-save.js"
import { onRequestGet as __api_jouissance_workshop_js_onRequestGet } from "/home/mexzungu/mexzungu-site/functions/api/jouissance-workshop.js"
import { onRequestOptions as __api_jouissance_workshop_js_onRequestOptions } from "/home/mexzungu/mexzungu-site/functions/api/jouissance-workshop.js"
import { onRequestPost as __api_jouissance_workshop_js_onRequestPost } from "/home/mexzungu/mexzungu-site/functions/api/jouissance-workshop.js"
import { onRequestGet as __api_jva_load_js_onRequestGet } from "/home/mexzungu/mexzungu-site/functions/api/jva-load.js"
import { onRequestOptions as __api_jva_load_js_onRequestOptions } from "/home/mexzungu/mexzungu-site/functions/api/jva-load.js"
import { onRequestOptions as __api_jva_save_js_onRequestOptions } from "/home/mexzungu/mexzungu-site/functions/api/jva-save.js"
import { onRequestPost as __api_jva_save_js_onRequestPost } from "/home/mexzungu/mexzungu-site/functions/api/jva-save.js"
import { onRequestOptions as __api_sha_audit_js_onRequestOptions } from "/home/mexzungu/mexzungu-site/functions/api/sha-audit.js"
import { onRequestPost as __api_sha_audit_js_onRequestPost } from "/home/mexzungu/mexzungu-site/functions/api/sha-audit.js"
import { onRequestOptions as __api_sha_submit_js_onRequestOptions } from "/home/mexzungu/mexzungu-site/functions/api/sha-submit.js"
import { onRequestPost as __api_sha_submit_js_onRequestPost } from "/home/mexzungu/mexzungu-site/functions/api/sha-submit.js"
import { onRequestOptions as __api_sheets_proxy_js_onRequestOptions } from "/home/mexzungu/mexzungu-site/functions/api/sheets-proxy.js"
import { onRequestPost as __api_sheets_proxy_js_onRequestPost } from "/home/mexzungu/mexzungu-site/functions/api/sheets-proxy.js"
import { onRequestOptions as __api_sign_js_onRequestOptions } from "/home/mexzungu/mexzungu-site/functions/api/sign.js"
import { onRequestPost as __api_sign_js_onRequestPost } from "/home/mexzungu/mexzungu-site/functions/api/sign.js"
import { onRequestPost as __audit_submit_js_onRequestPost } from "/home/mexzungu/mexzungu-site/functions/audit/submit.js"
import { onRequest as __api_ig_callback_js_onRequest } from "/home/mexzungu/mexzungu-site/functions/api/ig-callback.js"
import { onRequest as __api_ig_webhook_js_onRequest } from "/home/mexzungu/mexzungu-site/functions/api/ig-webhook.js"

export const routes = [
    {
      routePath: "/api/temp-check/alert",
      mountPath: "/api/temp-check",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_temp_check_alert_js_onRequestOptions],
    },
  {
      routePath: "/api/temp-check/alert",
      mountPath: "/api/temp-check",
      method: "POST",
      middlewares: [],
      modules: [__api_temp_check_alert_js_onRequestPost],
    },
  {
      routePath: "/api/temp-check/heartbeat",
      mountPath: "/api/temp-check",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_temp_check_heartbeat_js_onRequestOptions],
    },
  {
      routePath: "/api/temp-check/heartbeat",
      mountPath: "/api/temp-check",
      method: "POST",
      middlewares: [],
      modules: [__api_temp_check_heartbeat_js_onRequestPost],
    },
  {
      routePath: "/api/temp-check/latest",
      mountPath: "/api/temp-check",
      method: "GET",
      middlewares: [],
      modules: [__api_temp_check_latest_js_onRequestGet],
    },
  {
      routePath: "/api/temp-check/latest",
      mountPath: "/api/temp-check",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_temp_check_latest_js_onRequestOptions],
    },
  {
      routePath: "/api/temp-check/log",
      mountPath: "/api/temp-check",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_temp_check_log_js_onRequestOptions],
    },
  {
      routePath: "/api/temp-check/log",
      mountPath: "/api/temp-check",
      method: "POST",
      middlewares: [],
      modules: [__api_temp_check_log_js_onRequestPost],
    },
  {
      routePath: "/api/rate/:path*",
      mountPath: "/api/rate",
      method: "GET",
      middlewares: [],
      modules: [__api_rate___path___js_onRequestGet],
    },
  {
      routePath: "/api/rate/:path*",
      mountPath: "/api/rate",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_rate___path___js_onRequestOptions],
    },
  {
      routePath: "/api/rate/:path*",
      mountPath: "/api/rate",
      method: "POST",
      middlewares: [],
      modules: [__api_rate___path___js_onRequestPost],
    },
  {
      routePath: "/api/jouissance-auth/:path*",
      mountPath: "/api/jouissance-auth",
      method: "",
      middlewares: [],
      modules: [__api_jouissance_auth___path___js_onRequest],
    },
  {
      routePath: "/api/pp-auth/:path*",
      mountPath: "/api/pp-auth",
      method: "",
      middlewares: [],
      modules: [__api_pp_auth___path___js_onRequest],
    },
  {
      routePath: "/api/duara-audit",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_duara_audit_js_onRequestOptions],
    },
  {
      routePath: "/api/duara-audit",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_duara_audit_js_onRequestPost],
    },
  {
      routePath: "/api/duara-chat",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_duara_chat_js_onRequestOptions],
    },
  {
      routePath: "/api/duara-chat",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_duara_chat_js_onRequestPost],
    },
  {
      routePath: "/api/duara-save",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_duara_save_js_onRequestGet],
    },
  {
      routePath: "/api/duara-save",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_duara_save_js_onRequestOptions],
    },
  {
      routePath: "/api/duara-save",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_duara_save_js_onRequestPost],
    },
  {
      routePath: "/api/jouissance-workshop",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_jouissance_workshop_js_onRequestGet],
    },
  {
      routePath: "/api/jouissance-workshop",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_jouissance_workshop_js_onRequestOptions],
    },
  {
      routePath: "/api/jouissance-workshop",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_jouissance_workshop_js_onRequestPost],
    },
  {
      routePath: "/api/jva-load",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_jva_load_js_onRequestGet],
    },
  {
      routePath: "/api/jva-load",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_jva_load_js_onRequestOptions],
    },
  {
      routePath: "/api/jva-save",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_jva_save_js_onRequestOptions],
    },
  {
      routePath: "/api/jva-save",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_jva_save_js_onRequestPost],
    },
  {
      routePath: "/api/sha-audit",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_sha_audit_js_onRequestOptions],
    },
  {
      routePath: "/api/sha-audit",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_sha_audit_js_onRequestPost],
    },
  {
      routePath: "/api/sha-submit",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_sha_submit_js_onRequestOptions],
    },
  {
      routePath: "/api/sha-submit",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_sha_submit_js_onRequestPost],
    },
  {
      routePath: "/api/sheets-proxy",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_sheets_proxy_js_onRequestOptions],
    },
  {
      routePath: "/api/sheets-proxy",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_sheets_proxy_js_onRequestPost],
    },
  {
      routePath: "/api/sign",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_sign_js_onRequestOptions],
    },
  {
      routePath: "/api/sign",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_sign_js_onRequestPost],
    },
  {
      routePath: "/audit/submit",
      mountPath: "/audit",
      method: "POST",
      middlewares: [],
      modules: [__audit_submit_js_onRequestPost],
    },
  {
      routePath: "/api/ig-callback",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_ig_callback_js_onRequest],
    },
  {
      routePath: "/api/ig-webhook",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_ig_webhook_js_onRequest],
    },
  ]