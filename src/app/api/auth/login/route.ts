import { NextResponse } from "next/server";
import { createSession, getAdminUsername, verifyAdminPassword } from "@/lib/auth";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const limited = rateLimit(clientKey(request, "login"), 8);
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
  const userOk = expectedUser.length === username.length && expectedUser === username;
  const passOk = await verifyAdminPassword(password);
  if (!userOk || !passOk) {
    return NextResponse.json({ error: "بيانات الدخول غير صحيحة." }, { status: 401 });
  }

  await createSession();
  return NextResponse.json({ ok: true });
}
