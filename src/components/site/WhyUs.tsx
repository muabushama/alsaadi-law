import { Reveal } from "@/components/motion/Reveal";

const items = [
  { title: "فريق عمل متخصص", text: "متابعة الملفات من خلال فريق يتعامل مع كل حالة بحسب طبيعتها." },
  { title: "متابعة دقيقة للإجراءات", text: "مسار إجرائي واضح مع إطلاع العميل على المستجدات." },
  { title: "الاهتمام بسرية المعلومات", text: "التعامل مع البيانات والمستندات في إطار من السرية المهنية." },
  { title: "وضوح الخطوات", text: "شرح الإجراءات المطلوبة دون وعود بنتائج غير مضمونة." },
  { title: "تنوع الخدمات", text: "خدمات قانونية وإجرائية تغطي مسارات متعددة للأفراد والشركات." },
  { title: "التواصل المستمر مع العملاء", text: "قنوات تواصل واضحة لمتابعة الطلب بعد استلامه." },
];

export function WhyUs() {
  return (
    <section id="why" className="bg-ink-2 py-12 text-paper sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="text-center px-1">
          <p className="text-sm text-brass">التميّز في الخدمة</p>
          <h2 className="mt-2 text-2xl font-medium leading-snug sm:text-3xl md:text-4xl">
            لماذا تختار مكتب السعدي؟
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-px bg-[#0a1624] sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} variant="fadeUp" delay={i * 0.05}>
              <div className="bg-ink p-6">
                <div className="mb-4 h-px w-12 bg-wine" />
                <h3 className="text-lg font-semibold text-brass">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-stone">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
