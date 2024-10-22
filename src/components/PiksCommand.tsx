import { prompts } from "@/data";
import { usePiks } from "@/contexts";
import Image from "next/image";
import clsx from "clsx";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

type PromptItem = {
  key: string;
  prompt: string;
  emojiPath: string;
};

const PiksCommand: React.FC = () => {
  const { newPrompts, isLoading, togglePrompt, generateImage } = usePiks();

  return (
    <div className="grid place-content-center place-items-start gap-6">
      <ul className="mx-auto grid max-w-[300px] grid-cols-emojis gap-2">
        {prompts.map((item: PromptItem) => (
          <li
            key={item.key}
            title={item.key}
            onClick={() => togglePrompt(item.prompt)}
            className={clsx(
              "block w-full cursor-pointer rounded bg-piks-100 p-2 ring-1 ring-piks-500/25",
              newPrompts.includes(item.prompt) &&
                "bg-piks-300/50 !ring-piks-500",
            )}
          >
            <Image
              src={item.emojiPath}
              width={48}
              height={48}
              alt={item.key}
              className="w-12"
            />
            <span className="mt-2 line-clamp-1 text-xs">{item.key}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={generateImage}
        className="flex w-full items-center justify-center gap-x-2 rounded bg-piks-300/50 px-4 py-2 ring-1 ring-piks-500"
      >
        {isLoading && <ArrowPathIcon className="w-4 animate-spin" />}
        <span>Generar imagen</span>
      </button>
    </div>
  );
};

export default PiksCommand;
