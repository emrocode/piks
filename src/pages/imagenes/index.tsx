import useSWR, { mutate } from "swr";
import { fetcher } from "@/utils/fetcher";
import { toast } from "sonner";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { CloudinaryUploadWidgetInfo } from "next-cloudinary";

export default function Galeria() {
  const { data: images, error, isLoading } = useSWR("/api/images", fetcher);
  if (error) return;
  if (isLoading) return <span>Cargando...</span>;
  if (images?.length === 0)
    return <span>No existen imágenes para mostrar</span>;

  const removeAsset = async (publicId: string) => {
    try {
      const res = await fetch("/api/images", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id: publicId }),
      });

      if (res.status === 200) {
        mutate("/api/images");
        toast.success("Imagen eliminada exitosamente", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredImages = images?.sort(
    (a: { created_at: string }, b: { created_at: string }) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );

  return (
    <div>
      <div className="grid grid-cols-wrapper gap-4">
        {filteredImages?.map((img: CloudinaryUploadWidgetInfo) => (
          <article
            key={img.asset_id}
            className="relative rounded-md bg-piks-100 p-4 shadow-sm ring-1 ring-piks-500/25"
          >
            <figure className="h-36 overflow-hidden rounded">
              <Image
                src={img.secure_url}
                width={144}
                height={144}
                alt=""
                className="block size-full object-cover object-center"
              />
            </figure>
            <div className="mt-4">
              <h3 className="max-w-36 break-words text-xs">{img.public_id}</h3>
              <button
                type="button"
                onClick={() => removeAsset(img.public_id)}
                className="absolute -right-2 -top-2 grid size-8 place-content-center rounded-full bg-piks-100 shadow-sm ring-1 ring-piks-500/25 transition-transform duration-150 ease-in-out hover:scale-110"
              >
                <XMarkIcon className="size-5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
