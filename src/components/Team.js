import Image from "next/image";

const Team = () => {
  return (
    <section className="container mx-auto px-5 md:px-16 lg:px-24" id="team">
      <div className="text-center mb-8">
        <span className="inline-block text-purple-600 font-semibold text-sm tracking-widest uppercase mb-4 bg-purple-50 px-6 py-2 rounded-full">
          OUR TEAM
        </span>
      </div>
          <h2 className="text-4xl text-center md:text-5xl font-bold dark:text-white mb-6">

        The most qualified individuals
      </h2>

      <div className="w-full max-w-5xl mx-auto mt-16">
        <Image
          src="/team.JPEG"
          width={1200}
          height={800}
          alt="Board Members"
          className="w-full h-auto rounded-3xl shadow-2xl"
        />
      </div>
    </section>
  );
};

export default Team;
