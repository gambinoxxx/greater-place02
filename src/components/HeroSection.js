import Link from "next/link";

const HeroSection = () => {
  return (
    <section
      className="relative text-center flex flex-col gap-10 sm:gap-20 items-center justify-center min-h-[80vh] mt-28 sm:mt-32 md:mt-44 overflow-hidden"
      id="home"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-20"
      >
        <source src="/video.mov" type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-10"></div>
      <div className="relative z-10 md:w-2/3 lg:w-1/2 container px-5 md:px-16 mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold dark:text-white mb-6">
          <span>Greater place</span>
        </h1>

        <p className="text-lg leading-normal sm:leading-loose my-4 md:my-6 mx-auto dark:text-white leading-relaxed  ">
          Welcome to Greater place Non-profit Inc est. in 2023
        </p>
        <Link href="#about" className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg px-12 py-4 rounded-full hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
          Explore
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
