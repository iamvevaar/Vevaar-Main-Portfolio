"use client";
import React, { useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";

interface PortfolioCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  videoUrl?: string;
  tryNowLink: string;
  learnMoreLink: string;
  youtubeLink: string;
  embeddedVideoUrl?: string;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  description,
  imageUrl,
  videoUrl,
  tryNowLink,
  learnMoreLink,
  youtubeLink,
  embeddedVideoUrl,
}) => {
  useEffect(() => {
    if (embeddedVideoUrl) {
      const scriptSrcMatch = embeddedVideoUrl.match(/src="([^"]+)"/);
      if (scriptSrcMatch && scriptSrcMatch[1]) {
        const scriptSrc = scriptSrcMatch[1];
        const script = document.createElement("script");
        script.src = scriptSrc;
        script.async = true;
        document.body.appendChild(script);

        // Optional: Clean up the script when the component unmounts
        return () => {
          document.body.removeChild(script);
        };
      }
    }
  }, [embeddedVideoUrl]);

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          {embeddedVideoUrl ? (
            <div
              className="w-full h-auto"
              dangerouslySetInnerHTML={{ __html: embeddedVideoUrl }}
            />
          ) : videoUrl ? (
            <video
              src={videoUrl}
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : imageUrl ? (
            <img
              src={imageUrl}
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          ) : null}
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as="a"
            href={tryNowLink}
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem>
          <div className="flex gap-4">
            <CardItem
              translateZ={20}
              as="a"
              href={learnMoreLink}
              target="_blank"
              className="px-4 py-2 rounded-xl cursor-pointer bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              Learn more
            </CardItem>
            <CardItem
              translateZ={20}
              as="a"
              href={youtubeLink}
              target="_blank"
              className="px-4 py-2 rounded-xl cursor-pointer bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-2"
            >
              <IconBrandYoutubeFilled size={18} />
              Watch on YouTube
            </CardItem>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
};