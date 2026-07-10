import { Link, useParams } from "react-router-dom";

import { packages } from "../data/packages";
import Header from "../components/Header";
import { Phone } from "lucide-react";
import { TEL_HREF } from "../data/contact";
const PackageDetail = () => {
  const { id } = useParams<string>();
  const pkg = packages.find((pkg) => pkg.id === id);

  if (!pkg) return <div>Package not found</div>;
  return (
    <div className="relative mx-auto max-w-2xl">
      <Header />
      <div className="m-2 pb-40">
        <img
          src={pkg.heroPhoto}
          alt={pkg.title}
          className="rounded-2xl h-44 w-full object-cover"
        />
        <h1 className="text-green-text font-semibold mt-2 text-2xl leading-tight tracking-tight">
          {pkg.title}
        </h1>
        <p className="text-muted">
          {pkg.durationDays} days • {pkg.region}
        </p>
        <div className="bg-hero-tint flex justify-between items-center p-2 my-4 rounded-md">
          <div className="flex flex-col">
            <span className="text-green-text font-semibold text-3xl leading-tight tracking-tight">
              ₹{pkg.price.toLocaleString("en-IN")}
            </span>
            <span className="text-muted">{pkg.priceNote}</span>
          </div>
          <span className="text-green-text bg-card-border rounded-lg p-1 text-xs font-bold">
            all-inclusive
          </span>
        </div>
        <p className="m-2 text-muted">{pkg.summary}</p>
        <div>
          <h2 className="font-semibold text-green-deep">What's Included</h2>
          {Object.entries(pkg.inclusions ?? {}).map(([key, value]) => (
            <div key={key} className="pl-3 py-2">
              <p className="font-semibold">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </p>
              <p className="text-muted text-sm">{value}</p>
            </div>
          ))}
        </div>
        {/* carousal */}
      </div>

      <div className="fixed bottom-0 z-10 border-t border-card-border bg-hero-tint left-1/2 -translate-x-1/2 w-full max-w-2xl">
        <div className="mx-2 my-4 flex flex-col justify-center">
          <Link
            to={`/Form/${id}`}
            className="bg-green-text text-white rounded-2xl py-4 px-2 text-center"
          >
            Enquire about this trip
          </Link>

          <a
            href={TEL_HREF}
            className="flex items-center gap-1 justify-center mt-2"
          >
            <Phone size={14} /> <span>Prefer to talk? Call us</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
