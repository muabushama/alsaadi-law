import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    title: "إرسال طلب الخدمة",
    text: "تعبئة النموذج وإرفاق المستندات الأولية بحسب طبيعة الطلب.",
  },
  {
    title: "مراجعة البيانات والمستندات",
    text: "يفحص الفريق البيانات المقدمة ويحدد النواقص إن وجدت.",
  },
  {
    title: "التواصل مع العميل",
    text: "توضيح المطلوب والخطوات التالية بعد مراجعة الملف.",
  },
  {
    title: "تحديد الإجراءات المناسبة",
    text: "اختيار المسار الإجرائي وفق طبيعة الحالة والاختصاص.",
  },
  {
    title: "متابعة الطلب وإطلاع العميل",
    text: "متابعة الملف وإبلاغ العميل بالمستجدات أولاً بأول.",
  },
];

export function HowWeWork() {
  return (
    <section className="bg-ink py-20 text-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="text-sm text-brass">آلية العمل</p>
          <h2 className="mt-2 text-3xl font-medium sm:text-4xl">كيف نعمل</h2>
          <div className="mx-auto mt-4 h-px w-12 bg-wine" />
        </Reveal>

        <ol className="relative mt-14 grid gap-6 md:grid-cols-5">
          <div className="pointer-events-none absolute top-7 right-0 left-0 hidden h-px bg-gradient-to-l from-transparent via-brass/70 to-transparent md:block" />
          {steps.map((step, i) => (
            <Reveal key={step.title} variant="fadeUp" delay={i * 0.07}>
              <li className="relative flex h-full flex-col">
                <span className="relative z-10 mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-brass bg-ink text-lg font-semibold text-brass shadow-[0_0_20px_rgba(201,162,39,0.25)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="service-card flex h-full flex-col rounded-[24px] p-5 text-center">
                  <p className="text-xs font-semibold tracking-wide text-brass">
                    الخطوة {i + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-paper">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/75">{step.text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
