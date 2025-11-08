import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandMailgun,
  IconBrandTwitter,
  IconBrandWhatsapp,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { Mail } from "lucide-react";
import { TextGenerateEffectWithObserver } from "../ui/text-generate-effect-with-observer";

export function Footer() {
  const about =
    "I'm a passionate software engineer who loves building innovative solutions and sharing knowledge with the community.";

  const whatsappNumber = "919928191868"; // use your number with country code
  const message = "Hey! I’d like to know more about your work."; // optional pre-filled message
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="container flex flex-col mx-auto my-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 pt-8 pb-16 bg-black text-white">
        {/* Video Section */}
        <div className="flex items-center justify-center">
          <video
            src="/one.mp4"
            loop={true}
            autoPlay={true}
            muted
            className="rounded-full h-64 w-64 object-cover"
          ></video>
        </div>

        {/* Content Section */}
        <div className="md:col-span-2 flex flex-col justify-center">
          {/* About Me */}
          <div>
            <h3 className="text-lg font-bold mb-4">About Me</h3>
            <div className="text-sm text-gray-400">
              <TextGenerateEffectWithObserver words={about} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Contact Section */}
            <div className="flex flex-col items-start">
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p className="text-sm text-gray-400">
                Email: iamvevaar@gmail.com
              </p>
              <a
                href="mailto:iamvevaar@gmail.com"
                className="text-sm text-blue-400 hover:underline"
              >
                <Mail size={20} className="inline mr-2" />
                Send an email
              </a>

              <p className="text-sm text-gray-400 mt-4">
                Phone: +91 9928191868
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:underline flex items-center"
              >
                <IconBrandWhatsapp size={20} className="mr-2" />
                Say Hi
              </a>
            </div>

            {/* Follow Me Section */}
            <div className="flex flex-col items-start">
              <h3 className="text-lg font-bold mb-4">Follow Me</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/iamvevaar"
                  target="blank"
                  className="text-gray-400 hover:text-white"
                >
                  <IconBrandGithub size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/iamvevaar/"
                  target="blank"
                  className="text-gray-400 hover:text-white"
                >
                  <IconBrandLinkedin size={24} />
                </a>
                <a
                  href="https://www.instagram.com/iamvevaar/"
                  target="blank"
                  className="text-gray-400 hover:text-white"
                >
                  <IconBrandInstagram size={24} />
                </a>
                <a
                  href="https://x.com/iamvevaar"
                  target="blank"
                  className="text-gray-400 hover:text-white"
                >
                  <IconBrandTwitter size={24} />
                </a>
                <a
                  href="https://youtube.com/@iamvevaar"
                  target="blank"
                  className="text-gray-400 hover:text-white"
                >
                  <IconBrandYoutube size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
