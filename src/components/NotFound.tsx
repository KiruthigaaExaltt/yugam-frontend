import Images from "../constants/images";

const NotFound = () => {
  return (
    <div className="h-screen w-screen">
      <img
        src={Images?.NotFound}
        alt="Not Found Image"
        className="h-full w-full bg-[#0097a8] object-contain"
      />
    </div>
  );
};

export default NotFound;
