import Image from "next/image";
import Link from "next/link";
import { withTransform } from "@/lib/cloudinary";

interface Collection {
  name: string;
  slug: string;
  cover: string;
  photos: { url: string; alt: string }[];
}

export default function CollectionCard({ collection }: { collection: Collection }) {
  // Force all covers to a consistent 3:2 crop so the grid is uniform
  // regardless of the original photo's orientation.
  const cover = withTransform(collection.cover, "c_fill,ar_3:2,w_800,q_auto,f_auto");

  return (
    <Link href={`/collections/${collection.slug}`} className="group block">
      <div className="overflow-hidden">
        <Image
          src={cover}
          alt={collection.name}
          width={800}
          height={533}
          className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="mt-5">
        <p className="text-base tracking-wide text-neutral-100">{collection.name}</p>
        <p className="text-sm text-neutral-500 mt-1">
          {collection.photos.length}{" "}
          {collection.photos.length === 1 ? "photo" : "photos"}
        </p>
      </div>
    </Link>
  );
}
