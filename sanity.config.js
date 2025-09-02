// sanity.config.js
// Sanity client configuration for the front-end (App Router). No webhooks / revalidation.
// Uses public env vars + optional token (server only) for authenticated or draft access.

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-09-01',
  useCdn: false, // TEMP: disable CDN while debugging empty results
};

export function assertSanityEnv() {
  if (typeof window !== 'undefined') return; // avoid noisy client console
  const required = ['NEXT_PUBLIC_SANITY_PROJECT_ID', 'NEXT_PUBLIC_SANITY_DATASET'];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length) {
    console.warn('[sanity] Missing env vars:', missing.join(', '));
  } else {
    console.log('[sanity] Env OK:', required.map(k => k + '=' + process.env[k]).join(' '));
  }
}

// Helper to get a configured client (lazy import to avoid bundling if unused)
export function getSanityClient({ useFresh = false, token } = {}) {
  const { createClient } = require('@sanity/client');
  return createClient({
    ...sanityConfig,
    token: token || process.env.SANITY_API_TOKEN || undefined,
    useCdn: useFresh ? false : sanityConfig.useCdn,
    perspective: token ? 'published' : 'published',
  });
}
