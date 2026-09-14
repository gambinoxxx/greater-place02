import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import ImageKit from "imagekit";
import { requireAdmin } from '../../../../lib/require-admin';

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' },
      where: { date: { gte: new Date(new Date().setHours(0,0,0,0)) } }
    });

    return NextResponse.json({ images, events });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching images' }, { status: 500 });
  }
}

export async function POST(request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const formData = await request.formData();
    const type = formData.get("type");

    if (type === "event") {
      const title = formData.get("title");
      const date = formData.get("date");
      const location = formData.get("location");

      if (!title || !date || !location) {
        return NextResponse.json(
          { error: "Title, date, and location are required" },
          { status: 400 }
        );
      }

      const parsedDate = new Date(date);
      if (Number.isNaN(parsedDate.getTime())) {
        return NextResponse.json({ error: "Invalid event date" }, { status: 400 });
      }

      const newEvent = await prisma.event.create({
        data: { title, date: parsedDate, location },
      });
      return NextResponse.json(newEvent);
    }

    const file = formData.get("file");
    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const isFeatured = formData.get("isFeatured") === 'true';

    if (!file || typeof file.arrayBuffer !== "function") {
      return NextResponse.json({ error: "No valid file uploaded" }, { status: 400 });
    }

    // Convert file to buffer for ImageKit upload
    const buffer = Buffer.from(await file.arrayBuffer());
    
    const imagekit = new ImageKit({
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
    });

    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      folder: "/gallery",
      tags: category ? [category] : []
    });
    
    const newImage = await prisma.galleryImage.create({
      data: {
        url: uploadResponse.url,
        fileId: uploadResponse.fileId,
        title,
        description,
        category,
        isFeatured,
      },
    });
    
    return NextResponse.json(newImage);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: 'Error saving image' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const type = searchParams.get('type');

  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

  const parsedId = Number.parseInt(id, 10);
  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    if (type === "event") {
      await prisma.event.delete({ where: { id: parsedId } });
      return NextResponse.json({ message: 'Event deleted successfully' });
    }

    const image = await prisma.galleryImage.findUnique({
      where: { id: parsedId },
    });

    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    if (image.fileId) {
      const imagekit = new ImageKit({
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
      });

      await imagekit.deleteFile(image.fileId);
    }

    await prisma.galleryImage.delete({
      where: { id: parsedId },
    });

    return NextResponse.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: 'Error deleting resource' }, { status: 500 });
  }
}