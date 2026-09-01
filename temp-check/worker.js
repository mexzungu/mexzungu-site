// temp-check Web Worker: sustained SHA-256 throughput benchmark.
// Reports progress + final throttle_percent + baseline delta.

let running = false;

self.onmessage = async (e) => {
  const msg = e.data;
  if (msg.type !== 'start') return;
  if (running) return;
  running = true;

  const durationMs = msg.durationMs || 12000;
  const bucketMs = 3000;
  const numBuckets = Math.max(2, Math.floor(durationMs / bucketMs));

  const bufferSize = 8192;
  const buf = new Uint8Array(bufferSize);
  crypto.getRandomValues(buf);

  const buckets = [];

  try {
    const startAll = performance.now();
    for (let b = 0; b < numBuckets; b++) {
      const bStart = performance.now();
      let ops = 0;
      while (performance.now() - bStart < bucketMs) {
        for (let i = 0; i < 32; i++) {
          await crypto.subtle.digest('SHA-256', buf);
          ops++;
        }
      }
      const elapsed = performance.now() - bStart;
      const opsPerSec = ops / (elapsed / 1000);
      buckets.push({ opsPerSec });

      const baseline = buckets[0].opsPerSec;
      let throttlePct = null;
      if (b > 0 && baseline > 0) {
        const drop = (baseline - opsPerSec) / baseline * 100;
        throttlePct = Math.max(0, drop);
      }
      self.postMessage({
        type: 'progress', bucket: b,
        elapsed: performance.now() - startAll,
        opsPerSec, throttlePct,
      });
    }

    const baseline = buckets[0].opsPerSec;
    const final = buckets[buckets.length - 1].opsPerSec;
    const throttlePercent = baseline > 0 ? Math.max(0, (baseline - final) / baseline * 100) : 0;
    const deltaMs = baseline > 0 && final > 0 ? Math.round((1000 / final - 1000 / baseline) * 1000) : null;

    self.postMessage({
      type: 'done',
      throttlePercent: Math.round(throttlePercent * 10) / 10,
      deltaMs, buckets,
    });
  } catch (err) {
    self.postMessage({ type: 'error', error: String(err && err.message || err) });
  }
  running = false;
};
