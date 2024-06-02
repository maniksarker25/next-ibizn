const Wifi = ({ facilities }) => {
  const hasWifi = facilities.some(
    (facility) => facility.toLowerCase() === "wifi"
  );
  return (
    <div>
      <h1 className="text-[#0080ff] text-[14px] md:text-[25px] font-outfit">
        Wi-Fi: {hasWifi ? "Available" : "Not Available"}
      </h1>
      ;
    </div>
  );
};

export default Wifi;
