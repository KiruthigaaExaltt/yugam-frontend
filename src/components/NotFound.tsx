import Images from "../constant/Images";

const NotFound = () => {
  return (
    <div className="h-screen w-screen">
      <img
        src={Images?.notFound}
        alt="Not Found Image"
        className="h-full w-full bg-[#0097a8] object-contain"
      />
    </div>
  );
};

export default NotFound;
