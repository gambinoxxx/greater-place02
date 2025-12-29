import Image from "next/image";

const Card = ({ imgSrc, title, desc }) => {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <Image
        src={imgSrc}
        width={50}
        height={50}
        alt="community image"
        className="mx-auto"
      />
      <h2 className="text-xl font-semibold text-purple-600">{title}</h2>
      <p className="leading-loose text-gray-600">
        {desc}
      </p>
    </div>
  );
};

const Community = () => {
  return (
    <section className="container mx-auto px-16 lg:px-32">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-2 lg:gap-16 text-center mx-auto">
        <Card 
          imgSrc="/community/1.svg" 
          title="Join the Community" 
          desc="Become part of a supportive family where faith, creativity, and friendship flourish together."
        />
        <Card 
          imgSrc="/community/2.svg" 
          title="Mentorship & Support" 
          desc="Connect with caring mentors and peers for encouragement, prayer, and spiritual guidance."
        />
        <Card 
          imgSrc="/community/3.svg" 
          title="Creative Resources" 
          desc="Access training materials, dance tutorials, and resources to help you grow in your gifts."
        />
      </div>
    </section>
  );
};

export default Community;
