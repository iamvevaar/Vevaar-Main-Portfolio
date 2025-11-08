"use client";
import { Timeline } from "../ui/timeline";
import { ImageCarousel } from "../ui/image-carousel";
import {
  IconCheckbox,
  IconLink,
  IconMapPin,
  IconMapPin2,
} from "@tabler/icons-react";
import Link from "next/link";

export function TimelineSection() {
  const data = [
    {
      title: "June 2024 ~ Present",
      images: [
        {
          src: "./riyaah-web.png",
          alt: "Riyaah Web",
          link: "https://riyaah.sa/ar",
          name: "Visit Riyaah",
        },
        {
          src: "./riyaah-mobile.png",
          alt: "Riyaah Mobile",
          link: "https://riyaah.sa/ar",
          name: "Visit Riyaah",
        },
      ],
      content: (item: any) => (
        <div>
          <span className="mb-4 text-xs font-normal flex justify-between text-neutral-800 md:text-sm dark:text-neutral-200">
            <h2 className="text-2xl">
              Software Developer ~{" "}
              <Link
                href="https://keuro.life"
                target="_blank"
                className="group text-2xl text-blue-500 md:text-inherit md:hover:text-blue-500"
              >
                Keuro Life
                <IconLink className="inline-block w-6 h-6 ml-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </h2>
            <span className="flex flex-col items-center">
              <IconMapPin /> Chennai
            </span>
          </span>
          <div className="mb-8 flex flex-row flex-wrap gap-4">
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <div>
                <IconCheckbox
                  className="text-green-500"
                  height={24}
                  width={24}
                />
              </div>

              <span>
                <span className="font-extrabold underline underline-offset-4">Algolia Analytics Optimization : </span>
                Optimized Algolia search analytics implementation, reducing
                monthly event errors by 85% (10,000+ to 1,500), significantly
                improving ML model training for product recommendations and
                trending items, resulting in better search relevance for KSA
                e-commerce platform.
              </span>
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <div>
                <IconCheckbox
                  className="text-green-500"
                  height={24}
                  width={24}
                />
              </div>

              <p>
                <span className="font-extrabold underline underline-offset-4">Referral System Implementation : </span>
                 Designed and integrated
                end-to-end refer-and-earn feature with social sharing
                capabilities, enabling viral growth marketing strategy and
                increasing customer acquisition channels for the platform.
              </p>
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <div>
                <IconCheckbox
                  className="text-green-500"
                  height={24}
                  width={24}
                />
              </div>
              <p>
                <span className="font-extrabold underline underline-offset-4">Analytics Events Restructuring : </span>
                 Restructured GA4 and CleverTap
                event tracking architecture following Google's best practices,
                implementing enhanced e-commerce tracking that provided accurate
                purchase funnel visibility and improved marketing attribution
                accuracy by 90%.
              </p>
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <div>
                <IconCheckbox
                  className="text-green-500"
                  height={24}
                  width={24}
                />
              </div>
              <p>
                <span className="font-extrabold underline underline-offset-4">API Stability Enhancement : </span>
                 Identified and resolved critical API
                integration issues through Kibana log analysis, reducing API
                error rates from 90% to under 10%, resulting in improved
                application stability and seamless user transactions.
              </p>
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <div>
                <IconCheckbox
                  className="text-green-500"
                  height={24}
                  width={24}
                />
              </div>
              <p>
                <span className="font-extrabold underline underline-offset-4">Cross-Browser Compatibility : </span>
                 Fixed platform-specific bugs and
                implemented polyfills to ensure feature parity across iOS
                Safari, Android Chrome, and desktop browsers, achieving 100%
                functionality coverage and eliminating device-specific user
                complaints.
              </p>
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <div>
                <IconCheckbox
                  className="text-green-500"
                  height={24}
                  width={24}
                />
              </div>
              <p>
                <span className="font-extrabold underline underline-offset-4">Performance & SEO Optimization : </span>
                 Improved Lighthouse performance
                score by 67% through lazy loading, code splitting, and bundle
                optimization while achieving 90%+ SEO score, directly impacting
                search rankings and reducing bounce rates.
              </p>
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <div>
                <IconCheckbox
                  className="text-green-500"
                  height={24}
                  width={24}
                  />
              </div>
              <p>
                <span className="font-extrabold underline underline-offset-4">Server-Side Rendering Implementation : </span>
                 Implemented SSR for
                homepage and critical landing pages using Next.js, reducing
                initial load time by 40% and improving Core Web Vitals metrics,
                leading to better search engine indexing and user engagement.
              </p>
            </div>
          </div>
          <div className="md:hidden">
            <ImageCarousel images={item.images} />
          </div>
          <div className="hidden md:grid grid-cols-2 gap-4">
            {item.images.map((image: any, idx: number) => (
              <Link
                href={image.link}
                key={`image-${idx}`}
                target="_blank"
                className="relative group overflow-hidden rounded-lg"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  width={500}
                  height={500}
                  className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4 text-lg font-bold transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className=" flex items-center gap-2">
                      <IconLink className="text-black" />
                      {image.name}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "April 2024 ~ May 2025",
      images: [
        {
          src: "./hirehive-cpvp.png",
          alt: "HireHive Web",
          link: "https://hire.atvoid.com/",
          name: "Visit HireHive",
        },
        {
          src: "./hirehive-mobile.png",
          alt: "HireHive Mobile",
          link: "https://hire.atvoid.com/",
          name: "Visit HireHive ",
        },
      ],
      content: (item: any) => (
        <div>
          <span className="mb-4 text-xs font-normal flex justify-between text-neutral-800 md:text-sm dark:text-neutral-200">
            <h2 className="text-2xl">
              Jr. Software Developer ~{" "}
              <Link
                href="https://atvoid.com/"
                target="_blank"
                className="group text-blue-500 md:text-inherit md:hover:text-blue-500"
              >
                Value At Void
                <IconLink className="inline-block w-6 h-6 ml-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>{" "}
            </h2>
            <span className="flex flex-col items-center">
              <IconMapPin /> Dubai
            </span>
          </span>
          <div className="mb-8 flex flex-row flex-wrap gap-4">
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <div>
                <IconCheckbox
                  className="text-green-500"
                  height={24}
                  width={24}
                />
              </div>
              <p>
                Successfully led the migration of the entire application from
                React.js to Next.js, improving page load time by 40% and SEO
                rankings
              </p>
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <div>
                <IconCheckbox
                  className="text-green-500"
                  height={24}
                  width={24}
                />
              </div>
              <p>
                Resolved complex CSS layout issues across multiple device
                viewports, enhancing the user experience for over 20% monthly
                active users
              </p>
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <div>
                <IconCheckbox
                  className="text-green-500"
                  height={24}
                  width={24}
                />
              </div>
              <p>
                Optimized PWA performance by implementing code splitting and
                lazy loading, reducing initial bundle size by 30%
              </p>
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <div>
                <IconCheckbox
                  className="text-green-500"
                  height={24}
                  width={24}
                />
              </div>
              <p>
                Implemented responsive UI components using Material UI and
                Tailwind CSS, ensuring cross- browser compatibility
              </p>
            </div>
          </div>
          <div className="md:hidden">
            <ImageCarousel images={item.images} />
          </div>
          <div className="hidden md:grid grid-cols-2 gap-4">
            {item.images.map((image: any, idx: number) => (
              <Link
                href={image.link}
                target="_blank"
                key={`image-${idx}`}
                className="relative group overflow-hidden rounded-lg"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  width={500}
                  height={500}
                  className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4 text-lg font-bold transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className=" flex items-center gap-2">
                      <IconLink className="text-white" />
                      {image.name}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "July 2023 ~ Decemeber 2023",
      images: [
        {
          src: "./herkey-web.png",
          alt: "HerKey Web",
          link: "https://www.herkey.com/",
          name: "Visit HerKey",
        },
        {
          src: "./herkey-mobile.png",
          alt: "HerKey Mobile",
          link: "https://www.herkey.com/",
          name: "Visit HerKey",
        },
      ],
      content: (item: any) => (
        <div>
          <span className="mb-4 text-xs font-normal flex justify-between text-neutral-800 md:text-sm dark:text-neutral-200">
            <h2 className="text-2xl">
              Intern Frontend Developer ~{" "}
              <Link
                href="https://www.flooid.in/"
                target="_blank"
                className="group text-blue-500 md:text-inherit md:hover:text-blue-500"
              >
                Flooid.in
                <IconLink className="inline-block w-6 h-6 ml-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </h2>
            <span className="flex flex-col items-center">
              <IconMapPin /> Bengaluru
            </span>
          </span>
          <div className="mb-8 flex flex-row flex-wrap gap-4">
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <div>
                <IconCheckbox
                  className="text-green-500"
                  height={24}
                  width={24}
                />
              </div>
              <p>
                Led end-to-end development of a high-performance creative hiring
                platform handling 2,500+ re- quests per second, managing
                frontend, backend, and DevOps responsibilities
              </p>
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <div>
                <IconCheckbox
                  className="text-green-500"
                  height={24}
                  width={24}
                />
              </div>
              <p>
                Collaborated with world-class designers to implement interactive
                UI/UX solutions using Three.js and GSAP animations for
                client-facing roles
              </p>
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <div>
                <IconCheckbox
                  className="text-green-500"
                  height={24}
                  width={24}
                />
              </div>
              <p>
                Conducted weekly progress presentations to C-level executives,
                translating technical achievements into business value
              </p>
            </div>
            <div className="flex items-start gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <div>
                <IconCheckbox
                  className="text-green-500"
                  height={24}
                  width={24}
                />
              </div>
              <p>
                Developed responsive frontend interfaces for Magento e-commerce
                projects while maintaining strong design-to-development workflow
              </p>
            </div>
          </div>
          <div className="md:hidden">
            <ImageCarousel images={item.images} />
          </div>
          <div className="hidden md:grid grid-cols-2 gap-4">
            {item.images.map((image: any, idx: number) => (
              <Link
                href={image.link}
                key={`image-${idx}`}
                target="_blank"
                className="relative group overflow-hidden rounded-lg"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  width={500}
                  height={500}
                  className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60 transition-all duration-300 group-hover:scale-105 group-hover:blur-sm"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4 text-lg font-bold transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="flex items-center gap-2">
                      <IconLink className="text-black" />
                      {image.name}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ),
    },
  ];
  return <Timeline data={data} />;
}
