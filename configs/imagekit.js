import ImageKit from "imagekit";

let imagekit;

try {
  imagekit = new ImageKit({
      publicKey : process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint : process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
  });
} catch (error) {
  console.warn("ImageKit init failed:", error.message);
}

export default imagekit;    