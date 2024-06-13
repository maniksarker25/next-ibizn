const Nitrox = ({ facilities }) => {
  const hasWifi = facilities.some(
    (facility) => facility.toLowerCase() === "nitrox"
  );
  return (
    <div>
      <h1 className="text-[#0080ff] text-[14px] md:text-[25px] font-outfit">
        Nitrox: {hasWifi ? "Available" : "Unavailable"}
      </h1>
    </div>
  );
};

export default Nitrox;
