import { Reveal } from "@/components/motion/Reveal";

export function About() {
  return (
    <section id="about" className="bg-paper py-12 text-char sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm text-wine">عن المكتب</p>
          <h2 className="mt-2 text-2xl font-medium leading-snug sm:text-3xl md:text-4xl">
            مؤسسة قانونية بمسار واضح وإجراءات منظمة
          </h2>
          <div className="mt-4 h-px w-12 bg-wine" />
        </Reveal>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <Reveal variant="slideStart">
            <p className="text-base leading-8 text-stone sm:text-lg sm:leading-9">
              يعمل مكتب السعدي على تقديم الاستشارات القانونية والخدمات الإجرائية
              للأفراد والشركات، مع متابعة الملفات وفق طبيعة كل حالة والالتزام
              بسرية المعلومات ووضوح الخطوات. لا نعد بنتائج محددة؛ بل نوضح المسار
              القانوني والإجرائي الممكن ونواكب العميل أثناء التنفيذ.
            </p>
          </Reveal>
          <Reveal variant="slideEnd" className="grid gap-px bg-line sm:grid-cols-2">
            {[
              "استشارات ومتابعة قضايا",
              "تأسيس شركات وتراخيص",
              "إجراءات حكومية منظمة",
              "تواصل مستمر مع العميل",
            ].map((item) => (
              <div key={item} className="bg-paper p-5">
                <p className="font-medium">{item}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
