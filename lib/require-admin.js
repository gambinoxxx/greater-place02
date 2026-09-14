const FIREBASE_LOOKUP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:lookup";

/**
 * Verify the Firebase ID token supplied by the client and require the
 * configured administrator account.
 *
 * This uses Firebase's authenticated accounts:lookup endpoint so the server
 * does not trust a client-supplied email address or a client-side admin check.
 */
export async function requireAdmin(request) {
  const authorization = request.headers.get("authorization");
  const match = authorization?.match(/^Bearer\s+(.+)$/i);

  if (!match) {
    return {
      ok: false,
      response: new Response(JSON.stringify({ error: "Authentication required" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }),
    };
  }

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  // Prefer the server-only ADMIN_EMAIL. The public variable is kept as a
  // backwards-compatible fallback so the current deployment does not break.
  const adminEmail = process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  if (!apiKey || !adminEmail) {
    console.error("Admin authentication is not configured correctly.");
    return {
      ok: false,
      response: new Response(JSON.stringify({ error: "Server authentication is not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }),
    };
  }

  try {
    const firebaseResponse = await fetch(`${FIREBASE_LOOKUP_URL}?key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken: match[1] }),
      cache: "no-store",
    });

    if (!firebaseResponse.ok) {
      return {
        ok: false,
        response: new Response(JSON.stringify({ error: "Invalid or expired authentication token" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }),
      };
    }

    const data = await firebaseResponse.json();
    const firebaseUser = data?.users?.[0];
    const email = firebaseUser?.email?.trim().toLowerCase();

    if (!firebaseUser || firebaseUser.disabled || email !== adminEmail.trim().toLowerCase()) {
      return {
        ok: false,
        response: new Response(JSON.stringify({ error: "Admin access required" }), {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }),
      };
    }

    return {
      ok: true,
      user: {
        uid: firebaseUser.localId,
        email: firebaseUser.email,
      },
    };
  } catch (error) {
    console.error("Admin authentication error:", error);
    return {
      ok: false,
      response: new Response(JSON.stringify({ error: "Authentication service unavailable" }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      }),
    };
  }
}
