import { Clock, Share2 } from "lucide-react";
import type { Package } from "../data/packages";
import { useInView } from "../hooks/useInView";

type pkgProp = {
  package: Package;
  index: number;
};
export const PackageCard = (props: pkgProp) => {
  const pkg = props.package;
  const BkpIcon = pkg.backupImg;
  const index = props.index;
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`rounded-lg bg-white shadow-lg transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <div className="h-44 bg-section-bg rounded-t-md relative flex items-center justify-center">
        <button className="text-green-text absolute top-0 right-0 rounded-full bg-white p-1 m-2 hover:cursor-pointer">
          <Share2 size={18} />
        </button>
        <BkpIcon size={48} className="text-green-text" />
      </div>
      <div className=" rounded-b-md p-2">
        <h2 className="font-semibold text-green-text text-lg">{pkg.title}</h2>
        <div className="flex items-center gap-1 text-muted">
          <Clock size={12} />
          <p>
            {pkg.durationDays} days • {pkg.region}
          </p>
        </div>

        <div className="flex justify-between  items-center">
          <h2 className="font-semibold text-green-text text-lg">
            ₹{pkg.price}{" "}
            <span className="font-normal text-muted text-base">
              {pkg.priceNote}
            </span>
          </h2>
          <button className="bg-green-btn p-2 px-4 rounded-lg text-white">
            Enquire
          </button>
        </div>
      </div>
    </div>
  );
};
