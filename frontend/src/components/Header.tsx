import { Phone, PlaneIcon } from "lucide-react";
import { TEL_HREF } from "../data/contact";
const Header = () => {
  return (
    <div className="flex justify-between items-center w-full p-4 border-b border-card-border bg-white">
      <div className="flex gap-4 items-center">
        <div className="rounded-full bg-green-btn p-2">
          <PlaneIcon size={18} className="text-white" />
        </div>

        <p className="text-green-text text-lg font-semibold">
          Payanam Holidays
        </p>
      </div>
      <a
        href={TEL_HREF}
        aria-label="Call us"
        className="flex gap-3 items-center bg-green-btn p-2 rounded-lg text-white shadow-sm transition-colors duration-200 hover:bg-green-text active:scale-95"
      >
        <Phone size={16} /> Call us
      </a>
    </div>
  );
};
export default Header;
