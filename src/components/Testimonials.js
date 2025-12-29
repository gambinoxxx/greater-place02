"use client";
import React, { useState } from "react";
import Image from "next/image";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const testimonials = [
  {
    id: 1,
    name: 'Ayomide Amore',
    role: 'Dancer',
    fullText: `I've always considered myself a Christian, but for a long time, I didn't really understand what that truly meant. I thought it was just about being a nice person. But it wasn't until I went through some tough times that I started to really understand the power and love of God.
    
    Just over a year ago, when I was 13, I got involved with someone who constantly left me for girls he thought were prettier. It really hurt me and made me hate the way I looked. I just wanted to feel beautiful in his eyes. I felt so low and helpless, and that's when I turned to God.
    
    Around that same time, my friend invited me to her church because she was dancing there. I watched girls my age perform, and for the first time in a long time, I felt peace. I even teared up and didn't know why. Afterward, my friend told me about Brandy, a woman with a small dance group, and encouraged me to join. That's how I became a part of Greater Place.
    
    Even though I joined, I still struggled with low self-esteem. But everything changed when we started dancing to "Something Has to Break." On performance day, Brandy told us to break off anything weighing us down as we danced. I thought about all my pain, and as I danced, I felt lighter—like God had lifted that weight off me. I truly felt His presence, and it was amazing.
    
    Since then, God has continued to work in my life. The move from middle school to high school has been tough, but through FCA and learning to be at peace even when I'm alone, God has kept me going. One big thing I've learned? It's okay to be by yourself—Jesus walks with me every step I take. I've even noticed that whenever danger like fights happen at school, I always seem to take a different route—what I once thought was coincidence, I now know is God's protection.
    
    And guess what? I made the cheer team too! I prayed hard for that, and God came through. Now, I understand church messages and praise dance on a whole new level. Everything makes sense because of Him.
    
    At the end of the day, the only one I want to impress or look beautiful for is God. Thank you for listening to my testimony. Remember—live for God, and you'll find peace. It's so worth it.
    
    God bless you all! 💛`,
    image: "/testimonials/1.png"
  },
  {
    id: 2,
    name: 'love.',
    role: 'Dancer',
    fullText: `i’ve been a christian like all of my life but i never truly encountered God. i also never fully understand what it meant to be a christan. i think that my old definition of being a christian would to be a good person, and to not sin a lot???? when i began to grow up i started to compare myself to other people, and mostly comparing my relationship/walk with God. i started going to revolution (middle school church) on wenesdays starting in 6th grade. going to revolution definitely helped me have a greater relationship with God but i still felt like something was missing. around that time i also started to praise dance. i feel like at first i didn’t take praise dancing as serious as i should’ve , but i also didn’t really understand the real meaning of everything. as i started dancing more and more i realized that praise dancing is a way to express your emotions to God without saying words. since then i’ve also felt like when i dance i can finally truly feel Gods presence with me. Dancing Greater place has taught many things and i’m truly grateful for them. i’ve realized that God is always there and he listens has gave me eternal peace in my life and i thank God for allowing Greater Place non profit to be apart of my life. My new definition of being a christian is devoting your life to Christ, following his Word, and trying our hardest to be how Jesus was`,
    image: "/testimonials/2.png"
  },
  {
    id: 3,
    name: 'kaylee',
    role: 'Member',
    fullText: 'Being a part of greater place has been such a wonderful experience for me. its not just about the dance, its about connecting with others who share the same passion for expressing our faith through movement. every practice feels like a celebration, where we uplift each other and grow together. performing in front of others allows me to share my joy and love for God. i am so thankful for the friendships that i have formed and the spiritual growth i have experienced through this journey. its truly a blessing to be part of greater place! being in greater place has really changed my life. its like a family where we all support each other, and every practice is filled with laughter and encouragement. it’s such a powerful way to share our faith. dance tells a story, and i love how we can express our emotions and beliefs through movement. its not just about the steps, its about the message we bring and the love we share. i feel so blessed to be part of this journey and to grow both as a dancer and as a person!💛',
    image: "/testimonials/3.png"
  },
  {
    id: 4,
    name: 'Favour Aibangbee',
    role: 'Member',
    fullText: `Favour gave her life to Christ when she was 14 years old. Her walk with God turned her from a timid daughter to a bold, gentle, and quiet spirit as she expresses the love of the father and intimacy with God through dance. Walking with God she realized that dancing was a form of expression and prayer unto her father and so she treasured dancing in her quiet time before the Lord with just an audience of one. Although as a little girl she was very shy and was scared to dance in front of people she allowed God to use her as a vessel to not only minister to him but now to other people. Today she still loves to dance and make choreography. Greater place has impacted my experience by teaching me that dancing is so much more than just movement but it’s also about atmosphere, the healing, the deliverance, and intercession that people receive through the arts.`,
    image: "/testimonials/4.png"
  },
  {
    id: 5,
    name: 'Ayanna.',
    role: 'Member',
    fullText: `From Performance to Presence: How Greater Place Taught Me the Beauty of Imperfection ,
    I was part of a competitive dance team in high school and a proud member of the #1 colorguard in the state at the time. Precision wasn’t optional — it was the standard. Every movement was detailed down to the half count, and even our fingers and toes had to align perfectly. When the count hit 5, 6, 7, 8 — you had to be on point.

Performing on the field wasn’t about “close enough” — it was about being on the exact spot at the exact moment. And for those unfamiliar with colorguard, let me paint the picture: we’re talking about an entire football field. You were expected to land on a specific dot, at a precise time, all while spinning and tossing a six-foot flag attached to a hollow metal pole. And that flag wasn’t just for show — it had real weight to it! Who came up with the idea to toss this thing in the air and catch it like it was easy? I mean… I beg your finest pardon!

And if you dropped it? Let’s just say your arm or foot would learn a hard lesson real quick. On top of that, you had to remember your count, hit your mark, and execute choreography — sometimes moving backwards or diagonally — all while making sure the formation stayed flawless. Because from the stands, if even one person was off, it disrupted the entire picture the team was working to create. And if the form wasn’t perfect? Oh, the band director would make us start over. Again. And again. And again. Right there under the unforgiving Florida sun.

And to be honest, the whole thing was giving military vibes. I mean, I remember being told I couldn’t even borrow a rubber band or a piece of makeup if I had forgotten mine. I thought, “Really? I can just borrow someone else’s!” But the answer was always nope — it had to be yours, or you were getting sent home. That was the level of discipline expected.

But to be fair, that discipline transformed me. It taught me structure, it built a strong sense of community — I mean, there were about 40 of us on the colorguard alone, not to mention over a hundred band members. It was intense, but it was also incredibly formative.

Fast forward to my first practice at Greater Place: I remember Brandy was choreographing a piece, and internally I was so frustrated — though I never said it to her at the time. I was thinking, “No one’s toes are pointed! Hands aren’t all in the same place! What is going on here?” I was so used to structure, precision, and everything looking uniform that the freedom felt… uncomfortable.

But Brandy’s approach was different. While she did want the dance to look beautiful and certain movements to be clean and intentional, the space was open, free, and Spirit-led. I wasn’t used to that. Instead of focusing on whether my hand was perfectly placed or if I was hitting the correct plié at the right count, I found myself focusing on something entirely new: the position of my heart.

And let me tell you — in all my years of dance, no one had ever asked about that. In the dance world, they don’t care about your heart; they care if you’re in position, on cue, and executing flawlessly, no matter what you’re going through. You could be having the worst day of your life, and none of that mattered. You still had to perform.

But at Greater Place, it wasn’t about performance — it was about presence. It was about flowing with the Holy Spirit. Yes, you still had to check your form, but more importantly, you had to check your heart. Was your heart truly in it? Were you ministering through movement? And the beauty of it all was that, in the process, I was being delivered and healed — and I didn’t even realize it.

That’s what Greater Place has taught me: not to chase perfection, but to understand that in our imperfection, God does the perfecting. He refines us. He delivers us. And that is the true power of dance. I thought I knew dance, but I had never experienced it in this way before — as a tool for transformation, freedom, and worship.
Greater Place showed me that worship isn’t about flawless steps, it’s about a surrendered heart.`,
    image: "/testimonials/1.png"
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === 'left') {
      setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
    } else {
      setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
    }
  };

  return (
    <section className="container mx-auto px-5 md:px-16 py-20" id="testimonials">
      <div className="text-center mb-12">
        <span className="inline-block text-purple-600 font-semibold text-sm tracking-widest uppercase mb-4 bg-purple-50 px-6 py-2 rounded-full">
          TESTIMONIALS
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Community Stories</h2>
      </div>

      <div className="relative bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-5xl mx-auto border border-gray-100">
        {/* Navigation Buttons */}
        <button 
          onClick={() => handleClick('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors z-10 hidden md:block shadow-sm"
          aria-label="Previous testimonial"
        >
          <ArrowBackIosNewIcon />
        </button>
        
        <button 
          onClick={() => handleClick('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors z-10 hidden md:block shadow-sm"
          aria-label="Next testimonial"
        >
          <ArrowForwardIosIcon />
        </button>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3 flex flex-col items-center text-center">
             <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-purple-100 relative mb-4 shadow-lg">
                <Image 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name}
                  fill
                  className="object-cover"
                />
             </div>
             <h3 className="text-2xl font-bold text-gray-900">{testimonials[currentIndex].name}</h3>
             <p className="text-purple-600 font-medium">{testimonials[currentIndex].role}</p>
          </div>

          <div className="w-full md:w-2/3">
            <div className="prose prose-purple max-w-none">
               <div className="text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                 {testimonials[currentIndex].fullText}
               </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex justify-center gap-4 mt-8 md:hidden">
          <button 
            onClick={() => handleClick('left')}
            className="p-3 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors shadow-sm"
          >
            <ArrowBackIosNewIcon />
          </button>
          <button 
            onClick={() => handleClick('right')}
            className="p-3 rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors shadow-sm"
          >
            <ArrowForwardIosIcon />
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d8b4fe;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #c084fc;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
