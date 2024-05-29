
const Diving = {
  title: "Diving",
  description: `The MSY Ilike liveaboard Raja Ampat caters for up to 16 guests in
  8 cabins. All cabins have individually controlled air conditioning,
  en-suite bathrooms, and hot and cold showers. In addition, the
  thoughtfully designed rooms can be laid out as twins or doubles,
  so can easily provide for your requirements. The yacht offers a
  large, comfortable outside deck to chill out after an incredible
  day’s diving.`,
  imageUrl:
    "https://images.unsplash.com/photo-1517627043994-b991abb62fc8?q=80&w=2034&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  imageAlt: "under water",
};

const Image = ({ src, alt }) => (
  <div className="md:w-1/2 md:h-3/4 md:bg-cyan-50 md:overflow-hidden md:rounded-lg">
    <img className="w-full h-full object-cover" src={src} alt={alt} />
  </div>
);

const Content = ({ title, description }) => (
  <div className="md:w-1/2 md:h-3/4 md:overflow-hidden md:rounded-lg md:flex md:items-start md:gap-10 md:flex-col md:pr-8">
    <h1 className="md:text-6xl md:font-light md:text-ellipsis md:text-[#0080FF]">
      {title}
    </h1>
    <p className="md:text-2xl md:font-light md:text-black md:leading-9">
      {description}
    </p>
    
  </div>
);

function Scuba() {
  return (
    <>
      <div id="diving" className="md:w-full md:h-[90vh] md:bg-slate-300 md:flex md:items-center md:gap-5 md:justify-between md:px-28">
        <Image src={Diving.imageUrl} alt={Diving.imageAlt} />
        <Content title={Diving.title} description={Diving.description} />
      </div>
    </>
  );
}

export default Scuba;
