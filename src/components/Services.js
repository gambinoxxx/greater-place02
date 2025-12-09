"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Gallery.scss';

const Gallery = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
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
        setImages(data.images || []);
      } catch (err) {
        console.error('Error fetching gallery images:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const displayedImages = showAll ? images : images.slice(0, 6);

  // Loading state
  if (loading) {
    return (
      <section className="app__gallery" id="gallery">
        <h2 className="head-text">Our Gallery</h2>
        <div className="app__gallery-container">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={`skeleton-${i}`} className="app__gallery-item skeleton">
              <div className="skeleton-loading"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="app__gallery" id="gallery">
        <h2 className="head-text">Our Gallery</h2>
        <div className="error-message">
          <p>Unable to load gallery images. Please try again later.</p>
        </div>
      </section>
    );
  }

  // Empty state
  if (images.length === 0) {
    return (
      <section className="app__gallery" id="gallery">
        <h2 className="head-text">Our Gallery</h2>
        <div className="empty-state">
          <p>No images available yet. Check back soon!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="app__gallery" id="gallery">
      <h2 className="head-text">Our Gallery</h2>
      
      <div className="app__gallery-container">
        {displayedImages.map((image, index) => (
          <motion.div
            key={`gallery-${image.id}-${index}`}
            className="app__gallery-item"
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedImage(image)}
          >
            <img 
              src={image.url} 
              alt={image.title || `Gallery ${index + 1}`}
              loading="lazy"
            />
            <div className="app__gallery-overlay">
              {image.title && (
                <div className="app__gallery-info">
                  <h3>{image.title}</h3>
                  {image.description && <p>{image.description}</p>}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {images.length > 6 && (
        <button 
          className="gallery-toggle-btn"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      )}

      {/* Modal for enlarged image */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "100vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.url}
                alt={selectedImage.title || "Enlarged"}
                className="modal-image"
              />
              {(selectedImage.title || selectedImage.description) && (
                <div className="modal-info">
                  {selectedImage.title && <h3>{selectedImage.title}</h3>}
                  {selectedImage.description && <p>{selectedImage.description}</p>}
                </div>
              )}
              <button 
                className="modal-close"
                onClick={() => setSelectedImage(null)}
                aria-label="Close modal"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

//export default Gallery;

export default Services;
