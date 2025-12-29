"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';

const Services = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid-small');

  // Fetch gallery images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin');
        
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

  const displayedImages = showAll ? images : images.slice(0, 16);

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

      {/* View Switcher Controls */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setViewMode('grid-small')}
          className={`p-2 rounded-lg transition-all ${viewMode === 'grid-small' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          title="Compact Grid"
        >
          <ViewComfyIcon />
        </button>
        <button
          onClick={() => setViewMode('grid-large')}
          className={`p-2 rounded-lg transition-all ${viewMode === 'grid-large' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          title="Large Grid"
        >
          <GridViewIcon />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          title="List View"
        >
          <ViewListIcon />
        </button>
      </div>

      {/* Gallery Grid */}
      <div className={`
        ${viewMode === 'grid-small' ? 'grid grid-cols-4 lg:grid-cols-8 gap-2' : ''}
        ${viewMode === 'grid-large' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : ''}
        ${viewMode === 'list' ? 'flex flex-col gap-4 max-w-4xl mx-auto' : ''}
        mb-12
      `}>
        {displayedImages.map((image, index) => (
          <div
            key={image.id || `gallery-${index}`}
            className={`
              group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-gray-100
              ${viewMode === 'list' ? 'flex flex-row h-32 sm:h-40' : 'aspect-square'}
            `}
            onClick={() => setSelectedImage(image)}
          >
            <div className={`relative ${viewMode === 'list' ? 'w-32 sm:w-48 h-full' : 'w-full h-full'}`}>
              <Image
                src={image.url}
                alt={image.title || `Gallery ${index + 1}`}
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            {/* Content */}
            {viewMode === 'list' ? (
              <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center">
                {image.title && <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-gray-900">{image.title}</h3>}
                {image.description && <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{image.description}</p>}
                {image.category && (
                  <span className="inline-block mt-2 text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full w-fit">
                    {image.category}
                  </span>
                )}
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {viewMode === 'grid-small' ? (
                    image.title && <h3 className="text-xs font-bold truncate">{image.title}</h3>
                  ) : (
                    <>
                      {image.title && <h3 className="text-xl font-bold mb-2">{image.title}</h3>}
                      {image.description && <p className="text-sm text-gray-200 line-clamp-2">{image.description}</p>}
                      {image.category && <span className="inline-block mt-3 text-xs bg-purple-500 px-3 py-1 rounded-full">{image.category}</span>}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Featured Badge */}
            {image.isFeatured && (
              <div className={`absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full ${viewMode === 'grid-small' ? 'scale-75 origin-top-right' : ''}`}>
                Featured
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {images.length > 16 && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg px-12 py-4 rounded-full hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            {showAll ? 'Show Less' : `Show More (${images.length - 16} more)`}
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
