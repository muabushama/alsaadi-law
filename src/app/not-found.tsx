import Link from "next/link";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-wine">404</p>
        <h1 className="mt-2 text-3xl font-medium">الصفحة غير موجودة</h1>
        <p className="mt-3 text-stone">تحقق من الرابط أو عد إلى الصفحة الرئيسية.</p>
        <Link href="/" className="mt-6 inline-block bg-ink px-5 py-3 font-semibold text-btn">
          العودة للرئيسية
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
