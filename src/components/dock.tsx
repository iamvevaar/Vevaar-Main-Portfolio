"use client";

import Link from "next/link";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandTelegram,
  IconBrandX,
  IconFileCv,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";

export function Dock() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.open(href, "_blank");
    }
  };

  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleClick(e, "#"),
    },
    {
      title: "Products",
      icon: <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#projects",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleClick(e, "#projects"),
    },
    {
      title: "Portfolio",
      icon: (
        <Link
          href="/portfolio"
          prefetch={true}
          className="h-full w-full flex items-center justify-center"
        >
          <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        </Link>
      ),
      href: "/portfolio",
    },
    {
      title: "CV",
      icon: (
        <a
          href="https://drive.google.com/file/d/1PxmEV-XA7NXWSc69XaAPMVUIvKlxP7UO/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="h-full w-full flex items-center justify-center"
        >
          <IconFileCv className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        </a>
      ),
      href: "https://drive.google.com/file/d/1PxmEV-XA7NXWSc69XaAPMVUIvKlxP7UO/view?usp=sharing",
    },
    {
      title: "Let's Talk",
      icon: (
        <IconBrandTelegram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#join-list",
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleClick(e, "#join-list"),
    },
    // {
    //   title: "Twitter",
    //   icon: <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
    //   href: "#",
    // },
    {
      title: "GitHub",
      icon: (
        <a
          href="https://github.com/iamvevaar"
          target="_blank"
          rel="noopener noreferrer"
          className="h-full w-full flex items-center justify-center"
        >
          <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        </a>
      ),
      href: "https://github.com/iamvevaar",
    },
  ];
  return (
    <FloatingDock
      mobileClassName="translate-y-20" // only for demo, remove for production
      items={links}
    />
  );
}
