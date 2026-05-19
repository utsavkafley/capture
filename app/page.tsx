import CollectionCard from "@/components/CollectionCard";
import data from "@/data/photos.json";

export default function Home() {
  return (
    <main className="min-h-screen px-8 py-14 md:px-16 lg:px-24">
      <header className="mb-20">
        <span className="text-xs tracking-[0.25em] uppercase text-neutral-500">
          capture
        </span>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-20 lg:gap-y-24">
        {data.collections.map((collection) => (
          <CollectionCard key={collection.slug} collection={collection} />
        ))}
      </div>
    </main>
  );
}
