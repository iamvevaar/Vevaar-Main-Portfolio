"use client";

import React from "react";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

interface PortfolioCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  tryNowLink?: string;
  learnMoreLink?: string;
  youtubeLink: string;
  embeddedVideoUrl?: string;
  type?: string;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  description,
  imageUrl,
  youtubeLink,
  type,
}) => {
  return (
    <a
      href={youtubeLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch: ${title}`}
      className="shine-surface group block w-[20rem] shrink-0 overflow-hidden rounded-2xl p-3 hover:-translate-y-1"
    >
      {/* Thumbnail with play overlay */}
      <div className="relative overflow-hidden rounded-xl">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-44 w-full bg-gradient-to-br from-neutral-800 to-neutral-900" />
        )}

        {/* Darkening veil for legibility + hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="shine-pill flex h-14 w-14 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-110">
            <IconPlayerPlayFilled className="ml-0.5 h-6 w-6" />
          </span>
        </div>

        {/* Category tag */}
        {type && (
          <span className="absolute left-2 top-2 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/80 backdrop-blur-sm">
            {type}
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="px-1 pb-1 pt-4">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-white">
          {title}
        </h3>
        {description && (
          <p className="mt-1 line-clamp-1 text-xs text-neutral-400">
            {description}
          </p>
        )}

        <span className="shine-pill mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white">
          <IconPlayerPlayFilled className="h-3.5 w-3.5" />
          Watch
        </span>
      </div>
    </a>
  );
};
