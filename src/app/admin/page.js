"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AdminPage = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Worship");
  const [isFeatured, setIsFeatured] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventForm, setEventForm] = useState({
    title: "",
    date: "",
    location: "",
  });
  const [inputKey, setInputKey] = useState(Date.now());
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else if (currentUser.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        router.push("/");
      } else {
        setUser(currentUser);
        fetchImages();
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/admin");
      const data = await res.json();
      setImages(data.images || []);
      setEvents(data.events || []);
    } catch (error) {
      console.error("Failed to fetch images", error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    setUploading(true);
    try {
      // 1. Send file and data to Server API
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("isFeatured", isFeatured);

      const response = await fetch("/api/admin", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Image uploaded successfully!");
        // Reset form
        setFile(null);
        setTitle("");
        setDescription("");
        setCategory("Worship");
        setIsFeatured(false);
        setInputKey(Date.now()); // Reset file input
        fetchImages(); // Refresh the list
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save to database");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEventUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("type", "event");
      formData.append("title", eventForm.title);
      formData.append("date", eventForm.date);
      formData.append("location", eventForm.location);

      const response = await fetch("/api/admin", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Event added successfully!");
        setEventForm({ title: "", date: "", location: "" });
        fetchImages();
      } else {
        throw new Error("Failed to add event");
      }
    } catch (error) {
      console.error("Event upload error:", error);
      alert("Failed to add event");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    
    try {
      const res = await fetch(`/api/admin?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchImages(); // Refresh list
      } else {
        alert("Failed to delete image");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleEventDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`/api/admin?id=${id}&type=event`, { method: "DELETE" });
      if (res.ok) {
        fetchImages();
      } else {
        alert("Failed to delete event");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#1e1e1e] p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Upload to Gallery</h1>
        
        <form onSubmit={handleUpload} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Image File</label>
            <input
              key={inputKey}
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full p-3 border rounded-xl dark:bg-[#2d2d2d] dark:border-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-xl dark:bg-[#2d2d2d] dark:border-gray-700"
              placeholder="e.g. Sunday Worship"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border rounded-xl dark:bg-[#2d2d2d] dark:border-gray-700"
              rows="3"
              placeholder="Brief description..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border rounded-xl dark:bg-[#2d2d2d] dark:border-gray-700"
              >
                <option value="Worship">Worship</option>
                <option value="Outreach">Outreach</option>
                <option value="Training">Training</option>
                <option value="Events">Events</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-5 h-5 rounded text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm font-medium">Feature this image?</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className={`w-full py-4 rounded-full font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all shadow-lg ${
              uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        </form>

        <div className="mt-16 border-t pt-8 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6">Manage Events</h2>
          <form onSubmit={handleEventUpload} className="space-y-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Event Title"
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                className="p-3 border rounded-xl dark:bg-[#2d2d2d] dark:border-gray-700"
                required
              />
              <input
                type="date"
                value={eventForm.date}
                onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                className="p-3 border rounded-xl dark:bg-[#2d2d2d] dark:border-gray-700"
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={eventForm.location}
                onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                className="p-3 border rounded-xl dark:bg-[#2d2d2d] dark:border-gray-700"
                required
              />
            </div>
            <button
              type="submit"
              disabled={uploading}
              className="w-full py-3 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 transition-all"
            >
              {uploading ? "Adding..." : "Add Event"}
            </button>
          </form>

          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                <div>
                  <h3 className="font-bold">{event.title}</h3>
                  <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()} - {event.location}</p>
                </div>
                <button
                  onClick={() => handleEventDelete(event.id)}
                  className="bg-red-600 text-white text-xs px-3 py-1 rounded-full hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t pt-8 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6">Manage Gallery ({images.length})</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img) => (
              <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100 dark:bg-gray-800">
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                  <p className="text-white font-bold text-sm mb-2 line-clamp-1">{img.title}</p>
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="bg-red-600 text-white text-xs px-3 py-1 rounded-full hover:bg-red-700"
                  >
                    Delete
                  </button>
                  {img.isFeatured && (
                    <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
