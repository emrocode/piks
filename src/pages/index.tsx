import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { getCldImageUrl, CldImage } from "next-cloudinary";
import { PiksUpload, PiksImageFallback } from "@/components";
import { prompts } from "@/data";
import clsx from "clsx";

type PromptItem = {
  key: string;
  prompt: string;
  emojiPath: string;
};

const Home: React.FC = () => {
  const [publicId, setPublicId] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedPrompts, setSelectedPrompts] = useState<string[]>([]);
  const [finalPrompts, setFinalPrompts] = useState<string>("");

  const imageUrl = getCldImageUrl({ src: publicId });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
  };

  const handleUpload = () => {
    setPublicId(inputValue);
    setInputValue("");
  };

  const togglePrompt = (prompt: string) => {
    setSelectedPrompts((prev) =>
      prev.includes(prompt)
        ? prev.filter((p) => p !== prompt)
        : prev.length < 3
          ? [...prev, prompt]
          : prev,
    );
  };

  const generateImage = () => setFinalPrompts(selectedPrompts.join(" "));

  return (
    <div className="size-full grid place-items-center">
      {imageUrl ? (
        <div className="size-full grid grid-cols-auto gap-8 md:grid-cols-[1fr_32rem]">
          <div className="w-full grid place-content-center">
            {finalPrompts ? (
              <CldImage
                src={imageUrl}
                width={300}
                height={300}
                unoptimized
                alt=""
                replaceBackground={{ prompt: finalPrompts }}
                className="aspect-square size-full block object-cover object-center"
              />
            ) : (
              <PiksImageFallback />
            )}
          </div>
          <div className="grid place-items-start place-content-center gap-6">
            <ul className="max-w-[300px] mx-auto grid grid-cols-emojis gap-2">
              {prompts.map((item: PromptItem) => (
                <li
                  key={item.key}
                  title={item.key}
                  onClick={() => togglePrompt(item.prompt)}
                  className={clsx(
                    "w-full block p-2 rounded cursor-pointer bg-piks-100 ring-1 ring-piks-500/25",
                    selectedPrompts.includes(item.prompt) &&
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
                  <span className="text-xs line-clamp-1 mt-2">{item.key}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={generateImage}
              className="bg-piks-300/50 ring-1 ring-piks-500 rounded px-4 w-full py-2"
            >
              Generar imagen
            </button>
          </div>
        </div>
      ) : (
        <PiksUpload
          inputValue={inputValue}
          setPublicId={setPublicId}
          handleInputChange={handleInputChange}
          handleUpload={handleUpload}
        />
      )}
    </div>
  );
};

export default Home;
