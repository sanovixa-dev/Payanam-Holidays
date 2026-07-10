import { Phone, PlaneIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { TEL_HREF } from "../data/contact";
const Header = () => {
  return (
    <div className="sticky top-0 z-20 w-full border-b border-card-border bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link
          to="/"
          className="flex gap-4 items-center rounded-md transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-btn"
        >
          <div className="rounded-full bg-green-btn p-2">
            <PlaneIcon size={18} className="text-white" />
          </div>

          <p className="text-green-text text-lg font-semibold">
            Payanam Holidays
          </p>
        </Link>
        <a
          href={TEL_HREF}
          aria-label="Call us"
          className="flex gap-3 items-center bg-green-btn p-2 rounded-lg text-white shadow-sm transition-colors duration-200 hover:bg-green-text active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-btn focus-visible:ring-offset-2"
        >
          <Phone size={16} /> Call us
        </a>
      </div>
    </div>
  );
};
export default Header;
