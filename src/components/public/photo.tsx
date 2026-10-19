import { photoSrcSet, photoUrl, type Photo as PhotoData } from "@/lib/photos";

/** A real photo from Unsplash's CDN, sized for its slot. */
export function Photo({
  photo,
  width,
  height,
  sizes,
  className = "",
  priority = false,
  position = "center",
}: {
  photo: PhotoData;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  priority?: boolean;
  position?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photoUrl(photo, width, height)}
      srcSet={photoSrcSet(photo, width, height)}
      sizes={sizes}
      width={width}
      height={height}
      alt={photo.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
      style={{ objectPosition: position }}
    />
  );
}

export function PhotoCredits({ photos }: { photos: PhotoData[] }) {
  return (
    <p>
      Photos by{" "}
      {photos.map((p, i) => (
        <span key={p.id}>
          <a href={p.page} target="_blank" rel="noreferrer" className="hover:underline">
            {p.credit}
          </a>
          {i < photos.length - 2 ? ", " : i === photos.length - 2 ? " and " : ""}
        </span>
      ))}{" "}
      on Unsplash.
    </p>
  );
}
