import RatingPortion from "./RatingPortion";

const Content = ({ title, description }) => (
  <div className="w-full lg:w-1/2  flex flex-col justify-center items-start  md:justify-start">
    <h1 className="text-3xl  text-[#0080FF] md:text-6xl md:font-light md:text-[#0080FF] mb-5">
      {title}
    </h1>
    <p className="text-[16px] md:text-xl md:font-light md:text-black md:leading-9">
      {description}
    </p>
    <RatingPortion />
  </div>
);

const Image = ({ src, alt }) => (
  <div className="p-2 w-full lg:w-1/2">
    <img className="w-full h-auto object-cover " src={src} alt={alt} />
  </div>
);

const Food = () => {
  const foodInfo = {
    title: "Food Onboard",
    description: `The MSY Ilike liveaboard Raja Ampat caters for up to 16 guests in 8
      cabins. All cabins have individually controlled air conditioning,
      en-suite bathrooms, and hot and cold showers. In addition, the
      thoughtfully designed rooms can be laid out as twins or doubles, so
      can easily provide for your requirements. The yacht offers a large,
      comfortable outside deck to chill out after an incredible day’s
      diving.`,
    imageUrl:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Delicious food",
  };

  return (
    <div className="flex flex-col gap-10 items-center lg:flex-row  my-16 lg:my-28  customContainer bg-white">
      <Content title={foodInfo.title} description={foodInfo.description} />
      <Image src={foodInfo.imageUrl} alt={foodInfo.imageAlt} />
    </div>
  );
};

export default Food;
