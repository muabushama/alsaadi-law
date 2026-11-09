export function JsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const data = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "مكتب السعدي للاستشارات القانونية والخدمات الإجرائية",
    url: siteUrl,
    image: `${siteUrl}/images/logo.png`,
    areaServed: "EG",
    inLanguage: "ar",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
