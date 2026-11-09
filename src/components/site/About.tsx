import { Reveal } from "@/components/motion/Reveal";

export function About() {
  return (
    <section id="about" className="bg-paper py-20 text-char">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm text-wine">عن المكتب</p>
          <h2 className="mt-2 text-3xl font-medium sm:text-4xl">
            مؤسسة قانونية بمسار واضح وإجراءات منظمة
          </h2>
          <div className="mt-4 h-px w-12 bg-wine" />
        </Reveal>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <Reveal variant="slideStart">
            <p className="text-lg leading-9 text-stone">
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
