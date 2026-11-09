import Image from "next/image";
import Link from "next/link";
import { serviceCategories } from "@/lib/services";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-[#0a1624] bg-ink-2 py-14 text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <Image
            src="/images/logo.png"
            alt="مكتب السعدي للاستشارات القانونية والخدمات الإجرائية"
            width={280}
            height={180}
            className="h-20 w-auto max-w-[260px] object-contain"
          />
          <p className="mt-4 text-sm leading-7 text-stone">
            منظومة خدمات قانونية وإجرائية للأفراد والشركات، مع متابعة منظمة وسرية مهنية.
          </p>
        </div>
        <div>
          <p className="font-semibold text-brass">أقسام الموقع</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-[#d4c7a0]">
            <Link href="/#about">عن المكتب</Link>
            <Link href="/#leadership">الهيكل التنفيذي</Link>
            <Link href="/#services">الخدمات القانونية</Link>
            <Link href="/#why">لماذا تختارنا؟</Link>
            <Link href="/#request">تقديم طلب</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-brass">الخدمات</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-[#d4c7a0]">
            {serviceCategories.slice(0, 6).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`}>
                {s.title}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-xs text-stone">
            بيانات التواصل الهاتفي تُضاف فور اعتماد الأرقام الرسمية للمكتب.
          </p>
          <Link href="/admin/login" className="mt-4 inline-block text-[11px] text-stone hover:text-brass">
            دخول الإدارة
          </Link>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-stone">
        جميع الحقوق محفوظة © {new Date().getFullYear()} مكتب السعدي للاستشارات القانونية والخدمات الإجرائية.
      </p>
    </footer>
  );
}
