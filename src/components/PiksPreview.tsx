import { usePiks } from "@/contexts";
import { getCldImageUrl } from "next-cloudinary";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import PiksCommand from "./PiksCommand";

const PiksPreview: React.FC = () => {
  const {
    publicId,
    imageUrl,
    isLoading,
    finalPrompts,
    setIsLoading,
    setImageUrl,
    handleDownloadImage,
  } = usePiks();

  const url = getCldImageUrl({
    src: publicId,
    transformations:
      finalPrompts && `/c_limit,w_750/e_gen_background_replace:${finalPrompts}`,
  });

  return (
    <div className="grid-cols-auto grid size-full gap-8 md:grid-cols-[1fr_32rem]">
      <div className="grid w-full place-content-center">
        <div className="relative">
          <Image
            src={url}
            width={360}
            height={360}
            alt=""
            onLoad={(e) => {
              const target = e.target as HTMLImageElement;
              setIsLoading(false);
              setImageUrl(target.currentSrc);
            }}
            className={clsx(
              "block size-full max-w-[360px] object-cover object-center",
              {
                ["animate-pulse"]: isLoading,
              },
            )}
          />
          {!isLoading && (
            <button
              type="button"
              onClick={() => handleDownloadImage(imageUrl)}
              className="absolute bottom-4 right-4 mt-4 flex max-w-max items-center gap-x-1 rounded-full bg-piks-100/50 px-4 py-2 ring-1 ring-piks-500 backdrop-blur-md"
            >
              <span className="text-xs">Descargar</span>
              <ArrowDownTrayIcon className="w-4" />
            </button>
          )}
        </div>
      </div>
      <PiksCommand />
    </div>
  );
};

export default PiksPreview;
