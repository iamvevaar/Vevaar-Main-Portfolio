import Demo, {
  InfiniteMoving3DCards,
} from "@/components/ui/InfiniteMoving3DCards";
import React from "react";

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

  return (
    <div className="min-h-screen  text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-outfit mb-10 sm:mb-16 text-xl text-center sm:text-5xl dark:text-white text-black">
          <span className="">Bridging tech and storytelling.</span>

          <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
            <span className="">
              I’m a creative software engineer who edits videos
            </span>
                <br/>
            <span className="">
             for those shaping the future of tech.
            </span>
          </div>
        </h1>
        <InfiniteMoving3DCards
          items={testimonials}
          direction="left"
          speed="normal"
        />
      </div>
    </div>
  );
};

export default PortfolioPage;
