import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { ArrowUpIcon, PlusIcon } from "@heroicons/react/24/outline";

type PiksUploadProps = {
  inputValue: string;
  setPublicId: Dispatch<SetStateAction<string>>;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
};

const PiksUpload: React.FC<PiksUploadProps> = ({
  inputValue,
  setPublicId,
  handleInputChange,
  handleUpload,
}) => {
  return (
    <div className="max-w-sm w-full">
      <div className="flex gap-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ingresa el ID público de la imagen"
          className="px-3 py-2 w-full ring-1 ring-piks-500/25 rounded text-sm bg-transparent placeholder:text-piks-500/50"
        />
        <button
          onClick={handleUpload}
          className="bg-piks-200 ring-1 rounded ring-piks-500/25 p-2"
        >
          <ArrowUpIcon className="w-4" />
        </button>
      </div>
      <span className="flex items-center my-2 before:h-px before:bg-piks-500/25 before:flex-grow before:mr-4 after:h-px after:bg-piks-500/25 after:flex-grow after:ml-4">
        o
      </span>
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        options={{ sources: ["local", "url"], multiple: false, maxFiles: 1 }}
        // @ts-expect-error: Property "public_id" does not exist
        // on type "string|CloudinaryUploadWidgetInfo"
        onSuccess={(result) => setPublicId(result?.info?.public_id)}
        onQueuesEnd={(_, { widget }) => widget.close()}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="py-2 max-w-max px-4 rounded-full ring-1 flex items-center gap-x-1 bg-piks-200 ring-piks-500/25"
          >
            <PlusIcon className="size-4" />
            <span className="text-sm">Subir imagen</span>
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default PiksUpload;
