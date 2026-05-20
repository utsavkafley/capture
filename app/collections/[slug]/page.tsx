import Link from "next/link";
import { notFound } from "next/navigation";
import PhotoView from "@/components/PhotoView";
import { getBlurDataURL } from "@/lib/cloudinary";
import data from "@/data/photos.json";

export function generateStaticParams() {
  return data.collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = data.collections.find((c) => c.slug === slug);
  return { title: collection ? `${collection.name} — capture` : "capture" };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = data.collections.find((c) => c.slug === slug);
  if (!collection) notFound();

  // Fetch all blur placeholders in parallel at build time.
  // They get baked into the static HTML — zero runtime cost.
  const blurDataURLs = await Promise.all(
    collection.photos.map((p) => getBlurDataURL(p.url))
  );

  return (
    <main className="min-h-screen">
      <header className="px-8 py-14 md:px-16 lg:px-24 mb-6 flex items-baseline gap-8">
        <Link
          href="/"
          className="text-xs tracking-[0.2em] uppercase text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          ← back
        </Link>
        <h1 className="text-base tracking-wide text-neutral-100">
          {collection.name}
        </h1>
      </header>

      <div className="flex flex-col items-center gap-24 pb-24">
        {collection.photos.map((photo, i) => (
          <PhotoView
            key={i}
            url={photo.url}
            alt={photo.alt}
            priority={i === 0}
            blurDataURL={blurDataURLs[i]}
          />
        ))}
      </div>
    </main>
  );
}
