"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";

const leaders = [
  {
    name: "المستشارة / ريم سعدى",
    title: "ماجستير في القانون العام والخاص",
    image: "/images/leader-reem.jpg",
    lines: [
      "باحثة ودكتوراه في القانون",
      "حاصلة على دورات التحكيم الدولي",
      "ودورات ICDL",
    ],
  },
  {
    name: "الأستاذ / بهاء الجعفرى",
    title: "المؤسس والرئيس التنفيذي",
    image: "/images/leader-bahaa.jpg",
    lines: [
      "قيادة وإدارة المكتب والإشراف على الخطط الاستراتيجية وتطوير الخدمات القانونية والإجرائية ومتابعة منظومة تأسيس الشركات والتراخيص والتعاقدات.",
    ],
  },
];

export function Leadership() {
  return (
    <section id="leadership" className="bg-ink py-12 text-paper sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="text-sm text-brass">القيادة</p>
          <h2 className="mt-2 text-2xl font-medium sm:text-3xl md:text-4xl">الهيكل التنفيذي</h2>
        </Reveal>
        <div className="mt-8 grid gap-px bg-[#0a1624] sm:mt-12 md:grid-cols-2">
          {leaders.map((leader, i) => (
            <Reveal key={leader.name} variant={i === 0 ? "slideStart" : "slideEnd"}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-ink-2"
              >
                <div className="relative h-64 overflow-hidden sm:h-80">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-semibold text-brass">{leader.name}</h3>
                  <p className="mt-1 text-sm text-[#d4c7a0]">{leader.title}</p>
                  <div className="mt-4 space-y-1 text-sm leading-7 text-stone">
                    {leader.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
