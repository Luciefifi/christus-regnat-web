"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export type PhotoGalleryLabels = {
  photo: string; // "Photo {n} of {total}", read by screen readers and shown in the viewer
  close: string;
  previous: string;
  next: string;
};

const label = (template: string, n: number, total: number) =>
  template.replace("{n}", String(n)).replace("{total}", String(total));

// A grid of photos; pressing one opens it full screen. <dialog> gives us Esc to close,
// focus handling and a backdrop for free.
export function PhotoGallery({
  photos,
  eventTitle,
  labels,
}: {
  photos: string[];
  eventTitle: string;
  labels: PhotoGalleryLabels;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(0);

  function show(index: number) {
    setOpen(index);
    dialog.current?.showModal();
  }

  // Wraps around: "next" on the last photo goes back to the first
  const move = (step: number) => setOpen((index) => (index + step + photos.length) % photos.length);

  return (
    <>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
        {photos.map((src, index) => (
          <li key={src} className={index === 0 ? "col-span-2 row-span-2" : undefined}>
            <button
              type="button"
              onClick={() => show(index)}
              className="group relative block aspect-[3/2] size-full overflow-hidden rounded-2xl"
            >
              <Image
                src={src}
                alt={`${eventTitle} · ${label(labels.photo, index + 1, photos.length)}`}
                fill
                sizes={
                  index === 0 ? "(min-width: 1024px) 44vw, 100vw" : "(min-width: 1024px) 22vw, 50vw"
                }
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={eventTitle}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") move(1);
          if (event.key === "ArrowLeft") move(-1);
        }}
        // A click on the dark backdrop (the dialog itself, not its content) closes it
        onClick={(event) => event.target === dialog.current && dialog.current?.close()}
        className="m-auto size-full max-h-none max-w-none bg-transparent p-0 backdrop:bg-ink/95"
      >
        <div className="relative grid size-full place-items-center p-4 sm:p-12">
          <div className="relative size-full">
            <Image
              src={photos[open]}
              alt={`${eventTitle} · ${label(labels.photo, open + 1, photos.length)}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          <p className="absolute top-4 left-4 text-sm font-semibold text-gold-100 sm:top-6 sm:left-6">
            {label(labels.photo, open + 1, photos.length)}
          </p>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 sm:top-5 sm:right-5"
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">{labels.close}</span>
          </button>

          {photos.length > 1 && (
            <>
              <ArrowButton side="left" label={labels.previous} onClick={() => move(-1)} />
              <ArrowButton side="right" label={labels.next} onClick={() => move(1)} />
            </>
          )}
        </div>
      </dialog>
    </>
  );
}

function ArrowButton({
  side,
  label,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-2xl text-white hover:bg-gold-400 hover:text-ink ${
        side === "left" ? "left-3 sm:left-5" : "right-3 sm:right-5"
      }`}
    >
      <span aria-hidden="true">{side === "left" ? "‹" : "›"}</span>
      <span className="sr-only">{label}</span>
    </button>
  );
}
