import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { ServiceIcon } from "@/components/icons";
import { getServiceBySlug, serviceCategories } from "@/lib/services";

export function generateStaticParams() {
  return serviceCategories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.short,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 text-char">
        <ServiceIcon name={service.icon} className="h-12 w-12 text-wine" />
        <h1 className="mt-4 text-4xl font-medium">{service.title}</h1>
        <p className="mt-4 text-lg leading-9 text-stone">{service.details}</p>
        <ul className="mt-8 space-y-2">
          {service.items.map((item) => (
            <li key={item} className="border border-line bg-ivory px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
        <Link
          href="/#request"
          className="mt-8 inline-block bg-ink px-5 py-3 font-semibold text-btn"
        >
          تقديم طلب لهذه الخدمة
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
