"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";

const leaders = [
  {
    name: "المستشارة / ريم سعدى",
    title: "دكتوراه في القانون",
    image: "/images/leader-reem.jpg",
    text: "الإشراف القانوني ومتابعة الملفات والاستشارات القانونية والمساهمة في إعداد ومراجعة الأسانيد والمذكرات والإجراءات القانونية وفقاً لطبيعة كل قضية.",
  },
  {
    name: "الأستاذ / بهاء الجعفرى",
    title: "المؤسس والرئيس التنفيذي",
    image: "/images/leader-bahaa.jpg",
    text: "قيادة وإدارة المكتب والإشراف على الخطط الاستراتيجية وتطوير الخدمات القانونية والإجرائية ومتابعة منظومة تأسيس الشركات والتراخيص والتعاقدات.",
  },
];

export function Leadership() {
  return (
    <section id="leadership" className="bg-ink py-20 text-paper">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="text-sm text-brass">القيادة</p>
          <h2 className="mt-2 text-3xl font-medium sm:text-4xl">الهيكل التنفيذي</h2>
        </Reveal>
        <div className="mt-12 grid gap-px bg-[#0a1624] md:grid-cols-2">
          {leaders.map((leader, i) => (
            <Reveal key={leader.name} variant={i === 0 ? "slideStart" : "slideEnd"}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-ink-2"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={leader.image}
                    alt={`صورة هوية بصرية لـ ${leader.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-semibold text-brass">{leader.name}</h3>
                  <p className="mt-1 text-sm text-[#d4c7a0]">{leader.title}</p>
                  <p className="mt-4 text-sm leading-7 text-stone">{leader.text}</p>
                  <p className="mt-4 text-[11px] text-stone">
                    الصورة تصميم هوية بصرية وليست صورة شخصية فوتوغرافية.
                  </p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
