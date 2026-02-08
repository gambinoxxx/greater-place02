import React, { useState, useEffect } from "react";

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
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);

  const verses = [
    {
      text: "David danced with all his might because of God's presence",
      ref: "2 Samuel 6:14"
    },
    {
      text: "Let them praise his name with dancing and make music to him with timbrel and harp.",
      ref: "Psalm 149:3"
    },
    {
      text: "You turned my wailing into dancing; you removed my sackcloth and clothed me with joy.",
      ref: "Psalm 30:11"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVerseIndex((prev) => (prev + 1) % verses.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

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
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex flex-col items-center gap-3 flex-shrink-0 justify-center">
            <div className="w-64 h-64 rounded-full overflow-hidden shadow-2xl ring-4 ring-white">
              <img
                src="/founder.jpg"
                height="256"
                alt="Brandy and Ijeoma"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="text-center">
              <p className="font-bold text-gray-900">Brandy & Ijeoma</p>
              <p className="text-purple-600 text-sm font-semibold">Founder & Executive Director</p>
            </div>
          </div>
          
          <div className="flex-1 text-center lg:text-left">
            {/* <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Our Leadership
            </h3> */}
            <p className="text-gray-700 leading-relaxed text-lg mb-4">
              Greater Place Nonprofit, founded by Brandy Onwuzuruike, creates spaces where God’s presence meets creative expression. Through dance, storytelling, and worship, we bring heaven to earth and serve God with all our might — “Your kingdom come, Your will be done, on earth as it is in heaven” (Matthew 6:10), just as “David danced before the Lord with all his might” (2 Samuel 6:14).
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Led alongside Executive Director Ijeoma, a lifelong dancer, storyteller, scriptwriter, author, and teacher, Greater Place empowers the next generation to boldly express themselves, discover their gifts, and use creativity to impact the world for Christ.
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
          highlight="Blessing others through authentic worship and cultural dance"
        />
      </div>

      {/* Biblical Foundation */}
      <div className="mt-20 bg-gradient-to-r from-purple-900 to-blue-900 rounded-3xl p-10 md:p-16 text-white text-center shadow-2xl">
        <div className="max-w-4xl mx-auto">
          <div className="text-6xl mb-6 opacity-50">"</div>
          <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-6 italic">
            {verses[currentVerseIndex].text}
          </blockquote>
          <p className="text-purple-200 text-lg">{verses[currentVerseIndex].ref}</p>
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
