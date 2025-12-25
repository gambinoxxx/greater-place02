import { NextResponse } from "next/server";
import ImageKit from "imagekit";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Debugging: Log key status to server terminal
    console.log("Auth Route - Public Key Exists:", !!process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY);
    console.log("Auth Route - Private Key Exists:", !!process.env.IMAGEKIT_PRIVATE_KEY);

    // 1. Check if the private key is loaded
    if (!process.env.IMAGEKIT_PRIVATE_KEY) {
      throw new Error("IMAGEKIT_PRIVATE_KEY is missing in environment variables");
    }

    // 2. Initialize ImageKit specifically for this request
    const imagekit = new ImageKit({
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
    });

    const authenticationParameters = imagekit.getAuthenticationParameters();
    return NextResponse.json(authenticationParameters);
  } catch (error) {
    console.error("ImageKit Auth Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}