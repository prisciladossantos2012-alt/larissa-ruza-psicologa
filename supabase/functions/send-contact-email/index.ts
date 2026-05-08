import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// In-memory rate limiting
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  rateLimitMap.set(ip, timestamps);
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  timestamps.push(now);
  return false;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: "Muitas tentativas. Tente novamente mais tarde." }), {
      status: 429,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("Email service is not configured");
      return new Response(JSON.stringify({ error: "Falha ao enviar mensagem. Tente novamente." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const escapeHtml = (text: string): string => {
      const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };
      return text.replace(/[&<>"']/g, (m) => map[m]);
    };

    const { firstName, lastName, email, whatsapp, howDidYouMeetMe } = await req.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s()-]{10,20}$/;
    const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;

    const isStr = (v: unknown): v is string => typeof v === "string";
    const validationError = (() => {
      if (!isStr(firstName) || firstName.trim().length === 0 || firstName.length > 50 || !nameRegex.test(firstName)) return "Nome inválido";
      if (!isStr(lastName) || lastName.trim().length === 0 || lastName.length > 50 || !nameRegex.test(lastName)) return "Sobrenome inválido";
      if (!isStr(email) || email.length > 255 || !emailRegex.test(email)) return "Email inválido";
      if (!isStr(whatsapp) || !phoneRegex.test(whatsapp)) return "WhatsApp inválido";
      if (howDidYouMeetMe !== undefined && howDidYouMeetMe !== null && howDidYouMeetMe !== "") {
        if (!isStr(howDidYouMeetMe) || howDidYouMeetMe.length > 500) return "Campo 'como me conheceu' inválido";
      }
      return null;
    })();

    if (validationError) {
      return new Response(JSON.stringify({ error: validationError }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const htmlBody = `
      <h2>Novo lead do site</h2>
      <p><strong>Nome:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>WhatsApp:</strong> ${escapeHtml(whatsapp)}</p>
      ${howDidYouMeetMe ? `<p><strong>Como me conheceu:</strong> ${escapeHtml(howDidYouMeetMe)}</p>` : ""}
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Site Larissa Ruza <contato@larissaruzapsicologa.com>",
        to: ["psilariruza@gmail.com"],
        subject: `Novo lead: ${firstName} ${lastName}`,
        html: htmlBody,
        reply_to: email,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend error:", res.status, data);
      return new Response(JSON.stringify({ error: "Falha ao enviar mensagem. Tente novamente." }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(JSON.stringify({ error: "Falha ao enviar mensagem. Tente novamente." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
