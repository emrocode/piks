import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { getCldImageUrl } from "next-cloudinary";
import { PiksCommand, PiksUpload } from "@/components";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

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
    replaceBackground: finalPrompts,
  });

  const handleDownloadImage = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "image.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

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
            <div className="relative">
              <Image
                src={imageUrl}
                width={300}
                height={300}
                alt=""
                className="block size-full object-cover object-center"
              />
              <button
                type="button"
                onClick={() => handleDownloadImage(imageUrl)}
                className="absolute bottom-4 right-4 mt-4 flex max-w-max items-center gap-x-1 rounded-full bg-piks-100/50 px-4 py-2 ring-1 ring-piks-500 backdrop-blur-md"
              >
                <span className="text-xs">Descargar</span>
                <ArrowDownTrayIcon className="w-4" />
              </button>
            </div>
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
