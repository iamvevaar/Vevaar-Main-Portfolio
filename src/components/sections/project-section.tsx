import { IconBrandYoutube, IconBrandYoutubeFilled } from "@tabler/icons-react";
import { PointerHighlight } from "../ui/pointer-highlight";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
export function ProjectSection() {
  return (
    <div 
      id="projects"
    className="h-auto py-4 sm:py-20 flex flex-col justify-center items-center px-4 tracking-tight">
      <div className="flex items-center justify-center flex-col">
        <h2 className="font-outfit  text-xl sm:text-5xl dark:text-white text-black flex flex-col items-center justify-center">
          <span>The best way to grow is to </span>

          <div className="relative flex justify-center bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
            <PointerHighlight
              rectangleClassName="bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
              pointerClassName="text-yellow-500"
            >
              <h2 className="text-5xl relative z-10 bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">
                build in public{" "}
              </h2>
            </PointerHighlight>
          </div>
        </h2>
      </div>

      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            X-Fathom
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            Enhanced Immersive Experience for Fathom
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-20">
            <CardItem
              translateZ={20}
              as="a"
              href="https://chromewebstore.google.com/detail/x-fathom/ephnakeihcedogcajbfodoenjhangmhg"
              target="__blank"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Try now →
            </CardItem>
            <div className="flex gap-4">
              <CardItem
                translateZ={20}
                as="a"
                href="https://x-fathom.vevaar.com/"
                target="_blank"
                className="px-4 py-2 rounded-xl cursor-pointer bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
              >
                Learn more
              </CardItem>
              <CardItem
                translateZ={20}
                as="a"
                href="https://www.youtube.com/shorts/eOewU1i8m4g" // <-- replace with your YouTube video link later
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
    </div>
  );
}
