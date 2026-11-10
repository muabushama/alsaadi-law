import { NextResponse } from "next/server";
import { createSession, getAdminUsername, verifyAdminPassword } from "@/lib/auth";
import { env, envStatus } from "@/lib/env";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(envStatus());
}

export async function POST(request: Request) {
  const limited = rateLimit(clientKey(request, "login"), 30, 15 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "محاولات كثيرة. حاول لاحقاً." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  const username = String(body?.username ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "").trim();
  if (!username || !password) {
    return NextResponse.json({ error: "أدخل اسم المستخدم وكلمة المرور." }, { status: 400 });
  }

  if (!env("ADMIN_USERNAME") || (!env("ADMIN_PASSWORD") && !env("ADMIN_PASSWORD_HASH"))) {
    return NextResponse.json(
      {
        error: "بيانات الأدمن غير واصلة للسيرفر. اعمل Redeploy بعد حفظ Environment variables.",
      },
      { status: 503 },
    );
  }

  const expectedUser = getAdminUsername().toLowerCase();
  const userOk = expectedUser.length > 0 && expectedUser === username;
  const passOk = await verifyAdminPassword(password);
  if (!userOk || !passOk) {
    return NextResponse.json({ error: "بيانات الدخول غير صحيحة." }, { status: 401 });
  }

  try {
    await createSession();
  } catch {
    return NextResponse.json(
      { error: "SESSION_SECRET غير مضبوط أو أقصر من 24 حرف." },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
