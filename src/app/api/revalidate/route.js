// src/app/api/revalidate/route.js
// Webhook endpoint for Sanity to trigger Incremental Static Regeneration (ISR).
// Configure a webhook in Sanity: POST -> https://your-domain.com/api/revalidate with a secret.

import { NextResponse } from 'next/server';
// Optional Sentry capture; install @sentry/nextjs and configure for production
let Sentry = null;
try { Sentry = require('@sentry/nextjs'); } catch (_) { Sentry = null; }

export async function POST(request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    const msg = 'Missing SANITY_REVALIDATE_SECRET';
    Sentry?.captureMessage?.(msg, { level: 'error' });
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    const msg = 'Invalid JSON';
    Sentry?.captureMessage?.(msg, { level: 'warning' });
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }

  if (body.secret !== secret) {
    const msg = 'Invalid secret';
    Sentry?.captureMessage?.(msg, { level: 'warning' });
    return NextResponse.json({ ok: false, error: msg }, { status: 401 });
  }

  // Determine which paths to revalidate based on document _type
  const docType = body?._type;
  const paths = new Set(['/']); // always revalidate home
  if (docType === 'portfolio' || docType === 'portfolioTeaser') paths.add('/portfolio');
  if (docType === 'testimonial') paths.add('/');

  try {
    // In App Router we use revalidatePath dynamically
    const { revalidatePath } = await import('next/cache');
    paths.forEach((p) => revalidatePath(p));
    return NextResponse.json({ ok: true, revalidated: Array.from(paths) });
  } catch (e) {
    Sentry?.captureException?.(e, { tags: { route: 'revalidate' }, extra: { body } });
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
