// Real photographs of trade work, free under the Unsplash License.
// Served from Unsplash's CDN, cropped and resized by URL parameters.
// Swap these for partners' own photos as soon as we have them.

export type Photo = {
  id: string;
  alt: string;
  credit: string;
  page: string;
};

export const photos = {
  layingPatio: {
    id: "photo-1707655536176-a2bc5e00cba9",
    alt: "A tradesman kneeling on a garden path, pointing between stone slabs with a trowel",
    credit: "nikkan Navidi",
    page: "https://unsplash.com/photos/a-man-working-on-a-piece-of-concrete-Y9xZc0PSTvo",
  },
  polishing: {
    id: "photo-1780558852670-3f49298ecc1f",
    alt: "A detailer in black gloves machine-polishing the bonnet of a dark blue car",
    credit: "Luay Barani",
    page: "https://unsplash.com/photos/person-polishing-a-blue-cars-hood-with-an-orbital-buffer-iXpjQNP__EQ",
  },
  finishedPatio: {
    id: "photo-1711098256574-7b497260cdc9",
    alt: "A new pale stone patio with a table and chairs outside a red-brick house",
    credit: "Elise Brown",
    page: "https://unsplash.com/photos/a-patio-with-a-table-and-chairs-in-front-of-a-brick-building-ebrpvrJQu-0",
  },
  electrical: {
    id: "photo-1621905251189-08b45d6a269e",
    alt: "An electrician in a yellow hard hat and gloves working on a wall-mounted fuse box",
    credit: "Emmanuel Ikwuegbu",
    page: "https://unsplash.com/photos/electrician-installing-wiring-with-yellow-hardhat-_2AlIm-F6pw",
  },
  plumbing: {
    id: "photo-1676210134188-4c05dd172f89",
    alt: "A plumber reaching under a sink to tighten the waste pipe",
    credit: "Timur Shakerzianov",
    page: "https://unsplash.com/photos/a-man-working-on-a-pipe-in-a-wall-c314Gh8dXAo",
  },
  painting: {
    id: "photo-1652829069834-2c05031199c5",
    alt: "A decorator in paint-spattered workwear loading a roller from a paint tray",
    credit: "Callum Hill",
    page: "https://unsplash.com/photos/a-man-with-a-paint-roller-painting-a-wall-f1UwaROA2UQ",
  },
  carpentry: {
    id: "photo-1687422810663-c316494f725a",
    alt: "A smiling carpenter planing a length of timber in his workshop",
    credit: "Ali Mkumbwa",
    page: "https://unsplash.com/photos/a-man-smiles-as-he-works-on-a-piece-of-wood-PxlKOcj0a3Q",
  },
  roofing: {
    id: "photo-1763665814538-8ba04597286c",
    alt: "Two roofers passing tiles to each other on a half-tiled roof",
    credit: "Sergej",
    page: "https://unsplash.com/photos/workers-installing-roof-tiles-on-a-new-building-OnwxQNEbPco",
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

export function photoUrl(photo: Photo, width: number, height?: number) {
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    q: "75",
    w: String(width),
    ...(height ? { h: String(height) } : {}),
  });
  return `https://images.unsplash.com/${photo.id}?${params}`;
}

export function photoSrcSet(photo: Photo, width: number, height?: number) {
  const ratio = height ? height / width : undefined;
  return [1, 2]
    .map((scale) => {
      const w = width * scale;
      return `${photoUrl(photo, w, ratio ? Math.round(w * ratio) : undefined)} ${w}w`;
    })
    .join(", ");
}

export const photoCredits = Object.values(photos);
