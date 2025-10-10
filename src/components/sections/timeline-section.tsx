import { Timeline } from "../ui/timeline";
import { ImageCarousel } from "../ui/image-carousel";
import { IconCheckbox, IconMapPin, IconMapPin2 } from "@tabler/icons-react";

export function TimelineSection() {
  const images = [
    {
      src: "https://assets.aceternity.com/templates/startup-1.webp",
      alt: "startup template",
    },
    {
      src: "https://assets.aceternity.com/templates/startup-2.webp",
      alt: "startup template",
    },
    {
      src: "https://assets.aceternity.com/templates/startup-3.webp",
      alt: "startup template",
    },
    {
      src: "https://assets.aceternity.com/templates/startup-4.webp",
      alt: "startup template",
    },
  ];
  const data = [
    {
      title: "June 2024 ~ Present",
      content: (
        <div>
          <span className="mb-4 text-xs font-normal flex justify-between text-neutral-800 md:text-sm dark:text-neutral-200">
            <h2 className="text-2xl">Software Developer ~ Keuro Life</h2>
            <span className="flex flex-col items-center">
              <IconMapPin /> Chennai
            </span>
          </span>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <IconCheckbox className="text-green-500 h-12 w-12" />
              <p>
                1. Algolia Analytics Optimization Optimized Algolia search
                analytics implementation, reducing monthly event errors by 85%
                (10,000+ to 1,500), significantly improving ML model training
                for product recommendations and trending items, resulting in
                better search relevance for KSA e-commerce platform.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <IconCheckbox className="text-green-500 h-12 w-12" />
              <p>
                Referral System Implementation Designed and integrated
                end-to-end refer-and-earn feature with social sharing
                capabilities, enabling viral growth marketing strategy and
                increasing customer acquisition channels for the platform.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <IconCheckbox className="text-green-500 h-12 w-12" />
              <p>
                Analytics Events Restructuring Restructured GA4 and CleverTap
                event tracking architecture following Google's best practices,
                implementing enhanced e-commerce tracking that provided accurate
                purchase funnel visibility and improved marketing attribution
                accuracy by 90%.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <IconCheckbox className="text-green-500 h-12 w-12" />
              <p>
                API Stability Enhancement Identified and resolved critical API
                integration issues through Kibana log analysis, reducing API
                error rates from 90% to under 10%, resulting in improved
                application stability and seamless user transactions.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <IconCheckbox className="text-green-500 h-12 w-12" />
              <p>
                Cross-Browser Compatibility Fixed platform-specific bugs and
                implemented polyfills to ensure feature parity across iOS
                Safari, Android Chrome, and desktop browsers, achieving 100%
                functionality coverage and eliminating device-specific user
                complaints.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <IconCheckbox className="text-green-500 h-12 w-12" />
              <p>
                Performance & SEO Optimization Improved Lighthouse performance
                score by 67% through lazy loading, code splitting, and bundle
                optimization while achieving 90%+ SEO score, directly impacting
                search rankings and reducing bounce rates.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <IconCheckbox className="text-green-500 h-12 w-12" />
              <p>
                Server-Side Rendering Implementation Implemented SSR for
                homepage and critical landing pages using Next.js, reducing
                initial load time by 40% and improving Core Web Vitals metrics,
                leading to better search engine indexing and user engagement.
              </p>
            </div>
          </div>
          <div className="md:hidden">
            <ImageCarousel images={images} />
          </div>
          <div className="hidden md:grid grid-cols-2 gap-4">
            <img
              src="./riyaah-web.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="./riyaah-mobile.png"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-contain shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "April 2024 ~ May 2024",
      content: (
        <div>
          <span className="mb-4 text-xs font-normal flex justify-between text-neutral-800 md:text-sm dark:text-neutral-200">
            <h2 className="text-2xl">
              Jr. Software Developer ~ Value At Void{" "}
            </h2>
            <span className="flex flex-col items-center">
              <IconMapPin /> Dubai
            </span>
          </span>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <IconCheckbox className="text-green-500" /> Successfully led the
              migration of the entire application from React.js to Next.js,
              improving page load time by 40% and SEO rankings
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <IconCheckbox className="text-green-500" /> Resolved complex CSS
              layout issues across multiple device viewports, enhancing the user
              experience for over 20% monthly active users
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <IconCheckbox className="text-green-500" /> Optimized PWA
              performance by implementing code splitting and lazy loading,
              reducing initial bundle size by 30%
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <IconCheckbox className="text-green-500" />
              Implemented responsive UI components using Material UI and
              Tailwind CSS, ensuring cross- browser compatibility
            </div>
          </div>
          <div className="md:hidden">
            <ImageCarousel images={images} />
          </div>
          <div className="hidden md:grid grid-cols-2 gap-4">
            <img
              src="./hirehive-cpvp.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="./hirehive-mobile.png"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-contain shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "July 2023 ~ Decemeber 2023",
      content: (
        <div>
          <span className="mb-4 text-xs font-normal flex justify-between text-neutral-800 md:text-sm dark:text-neutral-200">
            <h2 className="text-2xl">Intern Frontend Developer - Flooid.in</h2>
            <span className="flex flex-col items-center">
              <IconMapPin /> Bengaluru
            </span>
          </span>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <IconCheckbox className="text-green-500" /> Led end-to-end
              development of a high-performance creative hiring platform
              handling 2,500+ re- quests per second, managing frontend, backend,
              and DevOps responsibilities
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <IconCheckbox className="text-green-500" /> Collaborated with
              world-class designers to implement interactive UI/UX solutions
              using Three.js and GSAP animations for client-facing roles
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <IconCheckbox className="text-green-500" />
              Conducted weekly progress presentations to C-level executives,
              translating technical achievements into business value
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm dark:text-neutral-300">
              <IconCheckbox className="text-green-500" />
              Developed responsive frontend interfaces for Magento e-commerce
              projects while maintaining strong design-to-development workflow
            </div>
          </div>
          <div className="md:hidden">
            <ImageCarousel images={images} />
          </div>
          <div className="hidden md:grid grid-cols-2 gap-4">
            <img
              src="./herkey-web.png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="./herkey-mobile.png"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-contain shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
  ];
  return <Timeline data={data} />;
}
