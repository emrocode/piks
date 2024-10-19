import { v2 as cloudinary } from "cloudinary";
import type { NextApiRequest, NextApiResponse } from "next";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    try {
      const { resources } = await cloudinary.api.resources({
        type: "upload",
        prefix: process.env.CLOUDINARY_IMAGES_DIRECTORY,
        context: true,
        max_results: 505,
      });

      res.status(200).json(resources);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching images" });
    }
  }

  if (req.method === "DELETE") {
    const { public_id } = req.body;

    if (!public_id)
      return res.status(400).json({ error: "Public ID is required" });

    try {
      const result = await cloudinary.uploader.destroy(public_id);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting image" });
    }
  }
}
