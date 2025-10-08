import Demo, {
  InfiniteMoving3DCards,
} from "@/components/ui/InfiniteMoving3DCards";
import { IconBrandYoutube, IconBrandYoutubeFilled } from "@tabler/icons-react";
import { PortfolioCard } from "@/components/ui/portfolio-card";
import React from "react";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

const PortfolioPage = () => {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      title: "Product Manager at TechCorp",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The team's support was outstanding every step of the way.",
      name: "Michael Rodriguez",
      title: "CTO at Innovation Labs",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop",
    },
    {
      quote:
        "This solution has saved us countless hours and improved our team's productivity significantly. Highly recommend to any growing business.",
      name: "Emily Watson",
      title: "Director of Operations at Scale Inc",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop",
    },
    {
      quote:
        "A game-changer for our industry. The functionality is powerful yet intuitive, making it accessible for our entire team.",
      name: "James Kim",
      title: "Founder of StartUp Studio",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    },
    {
      quote:
        "The level of customization and flexibility is remarkable. It's clear this product was built with real user needs in mind.",
      name: "Lisa Thompson",
      title: "Design Lead at Creative Co",
      image:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=800&h=600&fit=crop",
    },
  ];

  const portfolioItems = [
    {
      title: "Ethereum BLOBS",
      description: "Everything you need to know in 2 mins",
      imageUrl:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tryNowLink:
        "https://chromewebstore.google.com/detail/x-fathom/ephnakeihcedogcajbfodoenjhangmhg",
      learnMoreLink: "https://x-fathom.vevaar.com/",
      youtubeLink: "https://www.youtube.com/shorts/eOewU1i8m4g",
      embeddedVideoUrl: `<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="en" dir="ltr">🚨 New short video: Ethereum BLOBS<br><br>-> Impact of Pectra on blobs<br>–> Blob gas price<br>–> Fusaka update: PEERDAS <br>-> EIP-7918: stabilizing blob fees for rollups.<br><br>everything you need to know in 2 mins <a href="https://t.co/SEatJLlqxJ">pic.twitter.com/SEatJLlqxJ</a></p>&mdash; Uttam (@uttam_singhk) <a href="https://twitter.com/uttam_singhk/status/1963578575304511674?ref_src=twsrc%5Etfw">September 4, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
      type: "Tutorials",
    },
     {
      title: "🚨 Gas sponsorship on @solana",
      description: "Everything you need to know in 2 mins",
      imageUrl:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tryNowLink:
        "https://chromewebstore.google.com/detail/x-fathom/ephnakeihcedogcajbfodoenjhangmhg",
      learnMoreLink: "https://x-fathom.vevaar.com/",
      youtubeLink: "https://www.youtube.com/shorts/eOewU1i8m4g",
      embeddedVideoUrl: `<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="en" dir="ltr">🚨 Gas sponsorship on <a href="https://twitter.com/solana?ref_src=twsrc%5Etfw">@solana</a> <br><br>Build your app with gas fully sponsored - 0 fees for users, no SOL required <a href="https://t.co/dwJdswgTAD">pic.twitter.com/dwJdswgTAD</a></p>&mdash; Uttam (@uttam_singhk) <a href="https://twitter.com/uttam_singhk/status/1971535776002556355?ref_src=twsrc%5Etfw">September 26, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
      type: "Tutorials",
    },
    {
      title: "Celestia Deep Dive",
      description: "Everything you need to know in 2 mins",
      imageUrl:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tryNowLink:
        "https://chromewebstore.google.com/detail/x-fathom/ephnakeihcedogcajbfodoenjhangmhg",
      learnMoreLink: "https://x-fathom.vevaar.com/",
      youtubeLink: "https://www.youtube.com/shorts/eOewU1i8m4g",
      embeddedVideoUrl: `<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="en" dir="ltr">Rollups, data availability, and what&#39;s cooking in the <a href="https://twitter.com/celestia?ref_src=twsrc%5Etfw">@celestia</a> ecosystem: this is a deep dive you won&#39;t want to miss 🦣<br><br>Our DevRel engineer <a href="https://twitter.com/uttam_singhk?ref_src=twsrc%5Etfw">@uttam_singhk</a> sat down with <a href="https://twitter.com/braveryandglory?ref_src=twsrc%5Etfw">@braveryandglory</a> from Celestia to unpack scaling solutions, LazyBridging Protocol, and CLOBs on BLOBs 👀<br><br>0:00… <a href="https://t.co/ABzGMvelAw">pic.twitter.com/ABzGMvelAw</a></p>&mdash; Alchemy (@Alchemy) <a href="https://twitter.com/Alchemy/status/1947643424812712232?ref_src=twsrc%5Etfw">July 22, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
      type: "Podcast",
    },
    {
      title: "@mattmurrs from @eigenlayer breaks down EigenDA with our DevRel @uttam_singhk:",
      description: "Everything you need to know in 2 mins",
      imageUrl:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tryNowLink:
        "https://chromewebstore.google.com/detail/x-fathom/ephnakeihcedogcajbfodoenjhangmhg",
      learnMoreLink: "https://x-fathom.vevaar.com/",
      youtubeLink: "https://www.youtube.com/shorts/eOewU1i8m4g",
      embeddedVideoUrl: `<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="en" dir="ltr">🎬 <a href="https://twitter.com/mattmurrs?ref_src=twsrc%5Etfw">@mattmurrs</a> from <a href="https://twitter.com/eigenlayer?ref_src=twsrc%5Etfw">@eigenlayer</a> breaks down EigenDA with our DevRel <a href="https://twitter.com/uttam_singhk?ref_src=twsrc%5Etfw">@uttam_singhk</a>:<br><br>0:00 Intro<br>1:03 WTF is DA Layer<br>4:30 Why Eigen DA<br>9:33 EigenDA not a DAC<br>15:10 Eigen DA v2 - Blazer (100MB/s) <br><br>Watch the full interview 👇 <a href="https://t.co/ihqhRjcLNG">pic.twitter.com/ihqhRjcLNG</a></p>&mdash; Alchemy (@Alchemy) <a href="https://twitter.com/Alchemy/status/1953505266093166793?ref_src=twsrc%5Etfw">August 7, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
      type: "Podcast",
    },
    {
      title: "How does EIP-7702 works?",
      description: "Everything you need to know in 2 mins",
      imageUrl:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tryNowLink:
        "https://chromewebstore.google.com/detail/x-fathom/ephnakeihcedogcajbfodoenjhangmhg",
      learnMoreLink: "https://x-fathom.vevaar.com/",
      youtubeLink: "https://www.youtube.com/shorts/eOewU1i8m4g",
      embeddedVideoUrl: `<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="en" dir="ltr">how does EIP-7702 works? introducing code to EOAs <a href="https://t.co/1AID9caxiG">pic.twitter.com/1AID9caxiG</a></p>&mdash; Uttam (@uttam_singhk) <a href="https://twitter.com/uttam_singhk/status/1899812215836037419?ref_src=twsrc%5Etfw">March 12, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
      type: "shorts",
    },
    {
      title: "X-Fathom Tool Explained",
      description: "Everything you need to know in 2 mins",
      imageUrl:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tryNowLink:
        "https://chromewebstore.google.com/detail/x-fathom/ephnakeihcedogcajbfodoenjhangmhg",
      learnMoreLink: "https://x-fathom.vevaar.com/",
      youtubeLink: "https://www.youtube.com/shorts/eOewU1i8m4g",
      embeddedVideoUrl: `<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="zxx" dir="ltr"><a href="https://t.co/o7NLBSfCeB">pic.twitter.com/o7NLBSfCeB</a></p>&mdash; Vevaar | वेवार (@iamvevaar) <a href="https://twitter.com/iamvevaar/status/1915679678188118112?ref_src=twsrc%5Etfw">April 25, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
      type: "shorts",
    },
    // Add more portfolio items here
  ];

  return (
    <div className="min-h-screen  text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-outfit mb-10 sm:mb-16 text-xl text-center sm:text-5xl dark:text-white text-black">
          <span className="">Bridging tech and storytelling.</span>

          <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
            <span className="">
              I’m a creative software engineer who edits videos
            </span>
            <br />
            <span className="">for those shaping the future of tech.</span>
          </div>
        </h1>

        <InfiniteMoving3DCards
          items={testimonials}
          direction="left"
          speed="normal"
          className="md:hidden"
        />
        <PointerHighlight>
          <span className="px-2">Shorts</span>
        </PointerHighlight>
        {/* Desktop View */}
        <div className="hidden md:flex flex-wrap justify-center gap-8">
          {portfolioItems
            .filter((item) => item.type === "shorts")
            .map((item, index) => (
              <PortfolioCard key={index} {...item} />
            ))}
        </div>

        <PointerHighlight>
          <span className="px-2">Podcast</span>
        </PointerHighlight>
        <div className="hidden md:flex flex-wrap justify-center gap-8">
          {portfolioItems
            .filter((item) => item.type === "Podcast")
            .map((item, index) => (
              <PortfolioCard key={index} {...item} />
            ))}
        </div>

        <PointerHighlight>
          <span className="px-2">Tutorials</span>
        </PointerHighlight>
        <div className="hidden md:flex flex-wrap justify-center gap-8">
          {portfolioItems
            .filter((item) => item.type === "Tutorials")
            .map((item, index) => (
              <PortfolioCard key={index} {...item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
