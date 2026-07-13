import { useState } from "react";
import { Clock, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Package } from "../data/packages";
import { useInView } from "../hooks/useInView";
import { getCardVisual } from "./packageCardVisuals";
import toast from "react-hot-toast";

type pkgProp = {
  package: Package;
  index: number;
};
export const PackageCard = (props: pkgProp) => {
  const pkg = props.package;
  const BkpIcon = pkg.backupImg;
  const index = props.index;
  const { ref, inView } = useInView();
  const visual = getCardVisual(pkg.category);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const showPhoto = pkg.heroPhoto && !imgFailed;

  const handleShare = async () => {
    const shareData = {
      title: pkg.title,
      text: pkg.summary,
      url: `${window.location.origin}/PackageDetail/${pkg.id}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("Link copied!");
      }
    } catch (err) {
      console.error("ERROR:", err);
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`group rounded-lg bg-white shadow-md transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-xl hover:duration-300 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <div
        className={`h-44 rounded-t-lg relative flex items-center justify-center overflow-hidden ${visual.gradient}`}
      >
        <div
          className={`absolute bottom-0 left-0 right-0 h-10 ${visual.overlay}`}
        />
        <button
          onClick={handleShare}
          aria-label="Share this package"
          className="text-green-text absolute top-0 right-0 z-10 rounded-full bg-white p-1.5 m-2 shadow-sm transition-transform duration-200 hover:scale-110 hover:cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <Share2 size={18} />
        </button>
        {showPhoto ? (
          <img
            src={pkg.heroPhoto}
            alt={pkg.title}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgFailed(true)}
            className={`h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-105 ${
              imgLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
            }`}
          />
        ) : BkpIcon ? (
          <BkpIcon className="text-white/90" size={40} />
        ) : null}
      </div>
      <div className="rounded-b-lg p-3">
        <h2 className="font-semibold text-green-text text-lg leading-snug line-clamp-1">
          {pkg.title}
        </h2>
        <div className="flex items-center gap-1 text-muted mt-1">
          <Clock size={12} />
          <p>
            {pkg.durationDays} days • {pkg.region}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <h2 className="font-semibold text-green-text text-lg">
            ₹{pkg.price.toLocaleString("en-IN")}{" "}
            <span className="font-normal text-muted text-base">
              {pkg.priceNote}
            </span>
          </h2>
          <Link
            to={`/PackageDetail/${pkg.id}`}
            className="bg-green-btn p-2 px-4 rounded-lg text-white transition-colors duration-200 hover:bg-green-text active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-btn focus-visible:ring-offset-2"
          >
            Enquire
          </Link>
        </div>
      </div>
    </div>
  );
};
