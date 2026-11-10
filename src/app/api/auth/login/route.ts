import { NextResponse } from "next/server";
import { createSession, getAdminUsername, verifyAdminPassword } from "@/lib/auth";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const limited = rateLimit(clientKey(request, "login"), 30, 15 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "محاولات كثيرة. حاول لاحقاً." },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null);
  const username = String(body?.username ?? "").trim();
  const password = String(body?.password ?? "");
  if (!username || !password) {
    return NextResponse.json({ error: "أدخل اسم المستخدم وكلمة المرور." }, { status: 400 });
  }

  const expectedUser = getAdminUsername();
  const userOk = expectedUser.length > 0 && expectedUser === username;
  const passOk = await verifyAdminPassword(password);
  if (!userOk || !passOk) {
    return NextResponse.json({ error: "بيانات الدخول غير صحيحة." }, { status: 401 });
  }

  try {
    await createSession();
  } catch {
    return NextResponse.json(
      { error: "SESSION_SECRET غير مضبوط. اعمل Redeploy بعد حفظ المتغيرات." },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
