import RatingPortion from './RatingPortion';

const Content = ({ title, description }) => (
  <div className="md:w-1/2 md:h-3/4 md:overflow-hidden md:rounded-lg md:flex md:items-start md:gap-10 md:flex-col md:pr-8">
    <h1 className="md:text-6xl md:font-light md:text-ellipsis md:text-[#0080FF]">{title}</h1>
    <p className="md:text-2xl md:font-light md:text-black md:leading-9">
      {description}
    </p>
    <RatingPortion />
  </div>
);

const Image = ({ src, alt }) => (
  <div className="md:w-1/2 md:h-3/4 md:bg-cyan-50 md:overflow-hidden md:rounded-lg">
    <img
      className="w-full h-full object-cover"
      src={src}
      alt={alt}
    />
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
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Delicious food"
  };

  return (
    <div className="md:w-full md:h-[90vh] md:bg-white md:flex md:items-center md:gap-5 md:justify-between md:px-28">
      <Content title={foodInfo.title} description={foodInfo.description} />
      <Image src={foodInfo.imageUrl} alt={foodInfo.imageAlt} />
    </div>
  );
}

export default Food;
