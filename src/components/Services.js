"use client";
import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch images from API on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/gallery');
        
        if (!response.ok) {
          throw new Error('Failed to fetch gallery images');
        }
        
        const data = await response.json();
        setAllImages(data.images || []);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const displayedImages = showAll ? allImages : allImages.slice(0, 6);

  // Close modal on ESC key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-5 md:px-16 py-20" id="gallery">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Our Gallery</h2>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-5 md:px-16 py-20" id="gallery">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Our Gallery</h2>
        <div className="text-center text-red-600 py-8">
          <p className="text-xl">Error loading gallery: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-5 md:px-16 py-20" id="gallery">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Our Gallery</h2>
      <p className="text-center text-gray-600 mb-12 text-lg">
        Moments captured in worship, dance, and community
      </p>

      {allImages.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <p className="text-xl">No images available yet. Check back soon!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {displayedImages.map((image, index) => (
              <div
                key={image.id || `gallery-${index}`}
                className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 aspect-square"
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image.url} 
                  alt={image.title || `Gallery ${index + 1}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    {image.title && (
                      <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                    )}
                    {image.description && (
                      <p className="text-sm text-gray-200 line-clamp-2">{image.description}</p>
                    )}
                    {image.category && (
                      <span className="inline-block mt-2 px-3 py-1 bg-purple-600 text-xs rounded-full">
                        {image.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Featured badge */}
                {image.isFeatured && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Featured
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Show More/Less Button */}
          {allImages.length > 6 && (
            <div className="text-center">
              <button 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg px-12 py-4 rounded-full hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? 'Show Less' : `Show All (${allImages.length} photos)`}
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          
          <div 
            className="relative max-w-6xl max-h-[90vh] animate-slideDown"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.url}
              alt={selectedImage.title || "Enlarged view"}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            
            {(selectedImage.title || selectedImage.description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white rounded-b-lg">
                {selectedImage.title && (
                  <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                )}
                {selectedImage.description && (
                  <p className="text-gray-200">{selectedImage.description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-50px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.4s ease-out;
        }
      `}</style>
    </section>
  );
};

//export default Gallery;

export default Services;
