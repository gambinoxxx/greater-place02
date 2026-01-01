import React from "react";

const FeatureCard = ({ imgSrc, title, desc, highlight }) => {
  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <div className="bg-black rounded-xl p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <img
            src={imgSrc}
            width="48"
            height="48"
            alt={title}
            className="object-contain"
          />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed mb-4">
          {desc}
        </p>
        
        {highlight && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm italic text-purple-600 font-medium">
              {highlight}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section className="container mx-auto px-5 md:px-16 py-20" id="about">
      {/* Header Section */}
      <div className="text-center mb-16">
        <span className="inline-block text-purple-600 font-semibold text-sm tracking-widest uppercase mb-4 bg-purple-50 px-6 py-2 rounded-full">
          About Greater Place Nonprofit Inc.
        </span>
        <h2 className="text-4xl md:text-5xl font-bold dark:text-white mb-6">
          About Greater Place
        </h2>
        <p className="text-xl  max-w-3xl mx-auto dark:text-white leading-relaxed ">
          Creating a sacred space where people of all ages can embrace their God-given creative gifts through dance
        </p>
      </div>

      {/* Founder Section */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 md:p-12 mb-16 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl ring-4 ring-white flex-shrink-0">
            <img
              src="/features/7.PNG"
              width="192"
              height="192"
              alt="Brandy Onwuzuruike"
              className="object-cover w-full h-full"
            />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              Brandy Onwuzuruike
            </h3>
            <p className="text-purple-600 font-semibold mb-4">Founder & Visionary</p>
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              Hi everyone! My name is Brandy Onwuzuruike, and I am the founder and visionary of Greater Place Nonprofit Inc. For as long as I can remember, I’ve had dreams and revelations of dancing and helping kids and youth. These visions confirmed what God was placing in my heart—that now is the time to fully walk in the calling He has given me.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              As a little girl, dancing in God’s presence shaped my spirit, soul, and body in powerful ways. Over time, God has continued to prune and prepare me in ways I never expected. I truly believe that Greater Place is more than a dance it’s a space for holistic growth. It’s a place where individuals of all ages, especially youth, can be nurtured spiritually, emotionally, and physically—through the beautiful avenue of dance. At Greater Place, we believe God is concerned with the whole person. In 1 Thessalonians 5:23, Paul prays that our spirit, soul, and body be kept blameless until the coming of the Lord. This Scripture is foundational to what we do—we want people to grow in wholeness, strength, and confidence in Christ.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-center mt-16">
        <FeatureCard
          imgSrc="/features/1.JPG"
          title="God's Presence"
          desc="We create an atmosphere where the tangible presence of God flows naturally through the art of dance, in worship and as a message to those He has called us to reach."
          highlight="Dancing in His presence shapes hearts in powerful ways"
        />
        
        <FeatureCard
          imgSrc="/features/2.JPG"
          title="Creative Expression"
          desc="A space where people of all ages can embrace their God-given creative gifts with confidence and boldness, connecting with God through dance."
          highlight="Every person has their own unique style of dance"
        />
        
        <FeatureCard
          imgSrc="/features/3.PNG"
          title="Lifestyle of Worship"
          desc="More than just a performance - it's a continual, consistent posture of surrender before God. A lifestyle of deep intimacy and authentic expression."
          highlight="It's not a one-time performance, it's a way of life"
        />
        
        <FeatureCard
          imgSrc="/features/4.PNG"
          title="Community Impact"
          desc="Building a community where others can experience transformation, connecting with God through their creative art and witnessing His presence in their lives."
          highlight="Blessing others through authentic worship and dance"
        />
      </div>

      {/* Biblical Foundation */}
      <div className="mt-20 bg-gradient-to-r from-purple-900 to-blue-900 rounded-3xl p-10 md:p-16 text-white text-center shadow-2xl">
        <div className="max-w-4xl mx-auto">
          <div className="text-6xl mb-6 opacity-50">"</div>
          <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-6 italic">
            David danced with all his might because of God's presence
          </blockquote>
          <p className="text-purple-200 text-lg">2 Samuel 6:14</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        {/* <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg px-12 py-4 rounded-full hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
          Join Our Mission
        </button> */}
      </div>
    </section>
  );
};

export default About;
