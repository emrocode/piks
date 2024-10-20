import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { getCldImageUrl } from "next-cloudinary";
import { PiksCommand, PiksUpload } from "@/components";

const Home: React.FC = () => {
  const [publicId, setPublicId] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedPrompts, setSelectedPrompts] = useState<string[]>([]);
  const [finalPrompts, setFinalPrompts] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
  };

  const handleUpload = () => {
    setPublicId(inputValue);
    setInputValue("");
  };

  // Selecciona máximo 3 prompts para reemplazar el background
  const togglePrompt = (prompt: string) => {
    setSelectedPrompts((prev) =>
      // Elimina los prompts que ya existen en el array
      prev.includes(prompt)
        ? prev.filter((p) => p !== prompt)
        : // Si el array tiene menos de 3 elementos sigue agregando
          // Sino deja de agregar
          prev.length < 3
          ? [...prev, prompt]
          : prev,
    );
  };

  // Une todos los prompts seleccionados
  const generateImage = () => setFinalPrompts(selectedPrompts.join(" "));

  const imageUrl = getCldImageUrl({
    src: publicId,
    width: 300,
    height: 300,
    replaceBackground: finalPrompts,
  });

  const piksCommandProps = {
    selectedPrompts,
    togglePrompt,
    generateImage,
  };

  const piksUploadProps = {
    inputValue,
    setPublicId,
    handleInputChange,
    handleUpload,
  };

  return (
    <div className="grid size-full place-items-center">
      {imageUrl ? (
        <div className="grid-cols-auto grid size-full gap-8 md:grid-cols-[1fr_32rem]">
          <div className="grid w-full place-content-center">
            <Image
              src={imageUrl}
              width={300}
              height={300}
              alt=""
              className="block aspect-square size-full object-cover object-center"
            />
          </div>
          <PiksCommand {...piksCommandProps} />
        </div>
      ) : (
        <PiksUpload {...piksUploadProps} />
      )}
    </div>
  );
};

export default Home;
