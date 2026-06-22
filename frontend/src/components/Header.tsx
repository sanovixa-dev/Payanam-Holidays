import { Phone, PlaneIcon } from "lucide-react";
const Header = () => {
  return (
    <div className="flex justify-between items-center w-full p-4 border-b-2 border-b-green-50">
      <div className="flex gap-4 items-center">
        <div className="rounded-full bg-green-btn p-2">
          <PlaneIcon size={18} className="text-white" />
        </div>

        <h1 className="text-green-text text-lg font-semibold">
          Payanam Holidays
        </h1>
      </div>
      <button className="flex gap-3 items-center bg-green-btn p-2 rounded-lg text-white">
        <Phone size={16} /> Call us
      </button>
    </div>
  );
};
export default Header;
