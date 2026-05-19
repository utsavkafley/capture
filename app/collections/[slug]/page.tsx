import Link from "next/link";
import { notFound } from "next/navigation";
import PhotoView from "@/components/PhotoView";
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

  return (
    <main className="min-h-screen px-8 py-14 md:px-16 lg:px-24">
      <header className="mb-20 flex items-baseline gap-8">
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

      <div className="flex flex-col items-center gap-20 md:gap-32">
        {collection.photos.map((photo, i) => (
          <div key={i} className="w-full md:w-[85%]">
            <PhotoView url={photo.url} alt={photo.alt} />
          </div>
        ))}
      </div>
    </main>
  );
}
