"use client";

import Image from "next/image";
import { useState } from "react";
import { youtubeThumbnail, type EventVideo } from "@/lib/events";

export type EventVideosLabels = {
  play: string; // "Play"
  moreVideos: string; // "More from this concert"
};

// A light YouTube player: a still image until someone presses play, so the page stays fast
// on slow networks and YouTube only loads (and sets cookies) for people who watch.
export function EventVideos({
  videos,
  eventTitle,
  labels,
  cover,
  priority = false,
}: {
  videos: EventVideo[];
  eventTitle: string;
  cover?: string; // a photo shown instead of the main video's still
  labels: EventVideosLabels;
  priority?: boolean; // true for the first image on the page
}) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const video = videos[current];

  function choose(index: number) {
    setCurrent(index);
    setPlaying(true);
  }

  return (
    <div className="bg-ink">
      <div className="relative aspect-video">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={`${video.title} · ${eventTitle}`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 size-full"
          >
            <Image
              src={
                current === 0
                  ? (cover ?? youtubeThumbnail(video.youtubeId, "maxres"))
                  : youtubeThumbnail(video.youtubeId, "hq")
              }
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              preload={priority}
              className="object-cover"
            />
            <span className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/10 to-transparent" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-16 place-items-center rounded-full bg-gold-400 text-ink shadow-xl transition group-hover:scale-110 sm:size-20">
                <PlayIcon />
              </span>
            </span>
            <span className="absolute inset-x-0 bottom-0 p-4 text-left text-sm font-semibold text-white sm:p-5">
              <span className="sr-only">{labels.play}: </span>
              {video.title}
            </span>
          </button>
        )}
      </div>

      {videos.length > 1 && (
        <div className="p-4 sm:p-5">
          <p className="text-xs font-semibold tracking-[0.2em] text-gold-300 uppercase">
            {labels.moreVideos}
          </p>
          {/* Scrolls sideways on phones; each song swaps into the player above */}
          <ul className="mt-3 flex snap-x gap-3 overflow-x-auto pb-2">
            {videos.map((item, index) => (
              <li key={item.youtubeId} className="w-36 shrink-0 snap-start">
                <button
                  type="button"
                  onClick={() => choose(index)}
                  aria-pressed={index === current}
                  className="group block w-full text-left"
                >
                  <span
                    className={`relative block aspect-video overflow-hidden rounded-lg ring-2 transition ${
                      index === current
                        ? "ring-gold-400"
                        : "ring-transparent group-hover:ring-gold-200"
                    }`}
                  >
                    <Image
                      src={youtubeThumbnail(item.youtubeId, "hq")}
                      alt=""
                      fill
                      sizes="144px"
                      className="object-cover"
                    />
                  </span>
                  <span className="mt-1.5 line-clamp-2 block text-xs text-gold-50/90">
                    {item.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="ml-1 size-7 sm:size-8"
      fill="currentColor"
    >
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}
