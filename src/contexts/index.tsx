import { createContext, useContext, useState } from "react";
import { getCldImageUrl } from "next-cloudinary";

type PiksContextType = {
  publicId: string;
  inputValue: string;
  newPrompts: string[];
  finalPrompts: string;
  imageUrl: string;
  isLoading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
  togglePrompt: (prompt: string) => void;
  generateImage: () => void;
  handleDownloadImage: (imageUrl: string) => Promise<void>;
  setPublicId: React.Dispatch<React.SetStateAction<string>>;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const PiksContext = createContext<PiksContextType | undefined>(undefined);

export const PiksProvider = ({ children }: { children: React.ReactNode }) => {
  const [publicId, setPublicId] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [newPrompts, setNewPrompts] = useState<string[]>([]);
  const [prevPrompts, setPrevPrompts] = useState(newPrompts);
  const [finalPrompts, setFinalPrompts] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
  };

  const handleUpload = () => {
    setPublicId(inputValue);
    setInputValue("");
  };

  // Selecciona máximo 3 prompts para reemplazar el background
  const togglePrompt = (prompt: string) => {
    setNewPrompts((prev) =>
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

  // Generar imagen uniendo todos los prompts seleccionados
  const generateImage = () => {
    if (JSON.stringify(newPrompts) !== JSON.stringify(prevPrompts)) {
      setFinalPrompts(newPrompts.join(" "));
      setPrevPrompts(newPrompts);
      setIsLoading(true);
    }
  };

  // Descargar imagen generada
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

  const imageFromCld = getCldImageUrl({
    src: publicId,
    transformations:
      finalPrompts && `/c_limit,w_750/e_gen_background_replace:${finalPrompts}`,
  });

  const value = {
    publicId,
    inputValue,
    newPrompts,
    finalPrompts,
    imageUrl: imageFromCld,
    isLoading,
    handleInputChange,
    handleUpload,
    togglePrompt,
    generateImage,
    handleDownloadImage,
    setPublicId,
    setImageUrl,
    setIsLoading,
  };

  return (
    <PiksContext.Provider value={{ ...value }}>{children}</PiksContext.Provider>
  );
};

export const usePiks = () => {
  const context = useContext(PiksContext);
  if (!context) {
    throw new Error("usePiks must be used within a PiksProvider");
  }
  return context;
};
