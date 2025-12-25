import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import imagekit from "../../../../configs/imagekit";

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
  try {
    const formData = await request.formData();
    const type = formData.get("type");

    if (type === "event") {
      const title = formData.get("title");
      const date = formData.get("date");
      const location = formData.get("location");

      const newEvent = await prisma.event.create({
        data: { title, date: new Date(date), location },
      });
      return NextResponse.json(newEvent);
    }

    const file = formData.get("file");
    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const isFeatured = formData.get("isFeatured") === 'true';

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to buffer for ImageKit upload
    const buffer = Buffer.from(await file.arrayBuffer());
    
    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      folder: "/gallery",
      tags: [category]
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
    return NextResponse.json({ error: 'Error saving image: ' + error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const type = searchParams.get('type');

  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

  try {
    if (type === "event") {
      await prisma.event.delete({ where: { id: parseInt(id) } });
      return NextResponse.json({ message: 'Event deleted successfully' });
    }

    const image = await prisma.galleryImage.findUnique({
      where: { id: parseInt(id) },
    });

    if (image && image.fileId) {
      await imagekit.deleteFile(image.fileId);
    }

    await prisma.galleryImage.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: 'Error deleting image' }, { status: 500 });
  }
}