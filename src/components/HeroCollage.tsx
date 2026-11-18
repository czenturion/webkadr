import Image from "next/image";

const tiles = [
  {
    src: "/hero/desk",
    sizes: "(min-width: 64rem) 150vh, 50vw",
    tile: "hero-tile-lead col-span-2 row-span-2",
    image: "object-[48%_50%]",
  },
  {
    src: "/hero/keyboard",
    sizes: "(min-width: 64rem) 110vh, 40vw",
    tile: "col-start-3 row-start-1",
    image: "-translate-y-[24%] scale-160",
  },
  {
    src: "/hero/chart",
    sizes: "34vw",
    tile: "col-start-4 row-start-1",
    image: "origin-[56%_43%] scale-135 object-[60%_100%]",
  },
  {
    src: "/hero/phone",
    sizes: "50vw",
    tile: "col-span-2 col-start-3 row-start-2",
    image: "object-[60%_62%]",
  },
];

export function HeroCollage() {
  return (
    <div
      aria-hidden="true"
      className="hero-veil cover-fade absolute inset-0 grid grid-cols-4 grid-rows-2 gap-0.5"
    >
      {tiles.map(({ src, sizes, tile, image }, index) => (
        <div
          key={src}
          className={`hero-tile relative isolate overflow-hidden bg-(--veil) ${tile}`}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes={sizes}
            loading="eager"
            fetchPriority={index === 0 ? "high" : undefined}
            className={`object-cover ${image}`}
          />
        </div>
      ))}
    </div>
  );
}
