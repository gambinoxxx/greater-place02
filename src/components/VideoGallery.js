import React, { useState } from 'react';

const VideoGallery = () => {
  const [showMoreVideos, setShowMoreVideos] = useState(false);
  
  const videos = [
    { id: 'IXCgjcl-APs', title: 'Worship Session 1', category: 'Worship' },
    { id: 'KmP1bqAB0_Q', title: 'Dance Performance 1', category: 'Performance' },
    { id: 'O_UcyWEkqSw', title: 'Worship Session 2', category: 'Worship' },
    { id: '_1fbvkqvMy4', title: 'Dance Performance 2', category: 'Performance' },
    { id: 'D2v3MfolRyI', title: 'Worship Session 3', category: 'Worship' },
    { id: 'ySDk4L9Yr-w', title: 'Dance Performance 3', category: 'Performance' },
    { id: 'Xp-AhwGJQCU', title: 'Worship Session 4', category: 'Worship' },
    { id: 'nnPUAXNlOTk', title: 'Dance Performance 4', category: 'Performance' }
  ];

  const displayedVideos = showMoreVideos ? videos : videos.slice(0, 3);

  return (
    <section className="container mx-auto px-5 md:px-16 py-20" id="videos">
      {/* Header Section */}
      <div className="text-center mb-16">
        <span className="inline-block text-purple-600 font-semibold text-sm tracking-widest uppercase mb-4 bg-purple-50 px-6 py-2 rounded-full">
          LATEST VIDEOS
        </span>
        <h2 className="text-4xl md:text-5xl font-bold dark:text-white mb-6">
          Worship & Performance Videos
        </h2>
        <p className="text-xl  max-w-3xl mx-auto dark:text-white leading-relaxed ">
          Experience our recent worship services and dance performances
        </p>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {displayedVideos.map((video) => (
          <div 
            key={video.id}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
          >
            <div className="relative aspect-video bg-gray-900 overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title || 'Video'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            
            {/* Video Info */}
            <div className="p-6">
              {video.title && (
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {video.title}
                </h3>
              )}
              
              {video.description && (
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {video.description}
                </p>
              )}
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                {video.category && (
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-medium">
                    {video.category}
                  </span>
                )}
                
                {video.duration && (
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {video.duration}
                  </span>
                )}
              </div>

              {video.isFeatured && (
                <div className="mt-3 inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full">
                  ⭐ Featured
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {videos.length > 3 && (
        <div className="text-center">
          <button
            onClick={() => setShowMoreVideos(!showMoreVideos)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg px-12 py-4 rounded-full hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            {showMoreVideos ? 'Show Less Videos' : `Show All Videos (${videos.length})`}
          </button>
        </div>
      )}
    </section>
  );
};

export default VideoGallery;
