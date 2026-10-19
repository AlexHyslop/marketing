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
} satisfies Record<string, Photo>;

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
