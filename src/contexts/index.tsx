import { createContext, useContext, useState } from "react";
import useSWR from "swr";

type PiksContextType = {
  publicId: string;
  inputValue: string;
  selectedPrompts: string[];
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
  const [selectedPrompts, setSelectedPrompts] = useState<string[]>([]);
  const [prevSelectedPrompts, setPrevSelectedPrompts] =
    useState(selectedPrompts);
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

  // Generar imagen uniendo todos los prompts seleccionados
  const generateImage = () => {
    if (
      JSON.stringify(selectedPrompts) !== JSON.stringify(prevSelectedPrompts)
    ) {
      setFinalPrompts(selectedPrompts.join(" "));
      setIsLoading(true);
      setPrevSelectedPrompts(selectedPrompts);
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

  const fetcher = (url: string) =>
    fetch(url).then((res) => {
      if (res.status === 423) {
        throw new Error("Pending");
      }
      return res.json();
    });

  const {} = useSWR(imageUrl, fetcher, {
    onError: (err) => {
      if (err.message === "Pending") {
        setIsLoading(true);
      }
    },
    onSuccess: () => {
      setIsLoading(false);
    },
  });

  const value = {
    publicId,
    inputValue,
    selectedPrompts,
    finalPrompts,
    imageUrl,
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
