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
    <div className="w-full max-w-sm">
      <div className="flex gap-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ingresa el ID público de la imagen"
          className="w-full rounded bg-transparent px-3 py-2 text-sm ring-1 ring-piks-500/25 placeholder:text-piks-500/50"
        />
        <button
          onClick={handleUpload}
          className="rounded bg-piks-200 p-2 ring-1 ring-piks-500/25"
        >
          <ArrowUpIcon className="w-4" />
        </button>
      </div>
      <span className="my-2 flex items-center before:mr-4 before:h-px before:flex-grow before:bg-piks-500/25 after:ml-4 after:h-px after:flex-grow after:bg-piks-500/25">
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
            className="flex max-w-max items-center gap-x-1 rounded-full bg-piks-200 px-4 py-2 ring-1 ring-piks-500/25"
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
