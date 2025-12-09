"use client";
import React, { useState, useEffect } from 'react';

const Services = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch gallery images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/gallery');
        
        if (!response.ok) {
          throw new Error('Failed to fetch gallery images');
        }
        
        const data = await response.json();
        setImages(data.images || []);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const displayedImages = showAll ? images : images.slice(0, 6);

  // Close modal when clicking escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  if (loading) {
    return (
      <section className="relative container px-5 md:px-16 mx-auto py-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading gallery...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative container px-5 md:px-16 mx-auto py-20">
        <div className="text-center">
          <p className="text-red-600">Error loading gallery: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative container px-5 md:px-16 mx-auto py-20" id="gallery">
      {/* Header Section */}
      <div className="text-center mb-16">
        <span className="inline-block text-purple-600 font-semibold text-sm tracking-widest uppercase mb-4 bg-purple-50 px-6 py-2 rounded-full">
          OUR GALLERY
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Moments of Worship & Dance
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Experience the joy and presence of God through our community
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {displayedImages.map((image, index) => (
          <div
            key={image.id || `gallery-${index}`}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer aspect-square bg-gray-100"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.url}
              alt={image.title || `Gallery ${index + 1}`}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {image.title && (
                  <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                )}
                {image.description && (
                  <p className="text-sm text-gray-200 line-clamp-2">{image.description}</p>
                )}
                {image.category && (
                  <span className="inline-block mt-3 text-xs bg-purple-500 px-3 py-1 rounded-full">
                    {image.category}
                  </span>
                )}
              </div>
            </div>

            {/* Featured Badge */}
            {image.isFeatured && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                Featured
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {images.length > 6 && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg px-12 py-4 rounded-full hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            {showAll ? 'Show Less' : `Show More (${images.length - 6} more)`}
          </button>
        </div>
      )}

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
            onClick={() => setSelectedImage(null)}
            aria-label="Close modal"
          >
            ×
          </button>

          <div
            className="relative max-w-7xl max-h-[90vh] mx-4 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.title || "Enlarged view"}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            
            {/* Image Info */}
            {(selectedImage.title || selectedImage.description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 rounded-b-lg">
                {selectedImage.title && (
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedImage.title}
                  </h3>
                )}
                {selectedImage.description && (
                  <p className="text-gray-200">{selectedImage.description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Custom animations CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Services;
