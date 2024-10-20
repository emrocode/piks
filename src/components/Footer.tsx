import Link from "next/link";
import Image from "next/image";
import { PlusIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer>
      <div className="box flex min-h-16 flex-col gap-4 pb-6 pt-12 text-xs">
        <WarningMessage />
        <HackathonLink />
      </div>
    </footer>
  );
};

const WarningMessage = () => (
  <p className="max-w-sm text-pretty text-xs">
    No subas imágenes personales. Asegúrate de utilizar únicamente imágenes que
    tengas derecho a compartir y que no contengan información sensible.
  </p>
);

const HackathonLink = () => {
  const imageSize = {
    width: 24,
    height: 24,
  };

  return (
    <Link
      href="https://cloudinary.com/blog/cloudinary-cloudcreate-spooky-ai-hackathon"
      target="_blank"
      rel="noopener noreferrer"
      className="flex max-w-max items-center gap-x-1"
    >
      <Image src="/cloudinary.svg" {...imageSize} alt="Cloudinary logo" />
      <PlusIcon width={16} height={16} />
      <Image src="/midudev.svg" {...imageSize} alt="Midudev logo" />
      <span>&nbsp;Hackaton</span>
    </Link>
  );
};

export default Footer;
