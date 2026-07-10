import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { packages } from "../data/packages";
import Header from "../components/Header";
import NotFound from "../components/NotFound";
import {
  BedDouble,
  Camera,
  Car,
  Phone,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { TEL_HREF } from "../data/contact";

function getInclusionIcon(key: string) {
  const k = key.toLowerCase();
  if (k.includes("transport")) return Car;
  if (k.includes("accommodation") || k.includes("room")) return BedDouble;
  if (k.includes("food")) return UtensilsCrossed;
  if (k.includes("sightseeing")) return Camera;
  return Sparkles;
}

const PhotoGallery = ({ photos, title }: { photos: string[]; title: string }) => {
  const [broken, setBroken] = useState<Record<number, boolean>>({});
  const visible = photos
    .map((src, i) => ({ src, i }))
    .filter(({ i }) => !broken[i]);

  if (visible.length === 0) return null;

  return (
    <div className="mt-4">
      <h2 className="font-semibold text-green-deep mb-2">Gallery</h2>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {visible.map(({ src, i }) => (
          <img
            key={src}
            src={src}
            alt={`${title} photo ${i + 1}`}
            onError={() => setBroken((prev) => ({ ...prev, [i]: true }))}
            className="h-24 w-32 shrink-0 rounded-lg object-cover"
          />
        ))}
      </div>
    </div>
  );
};

const PackageDetail = () => {
  const { id } = useParams<string>();
  const pkg = packages.find((pkg) => pkg.id === id);
  const [heroFailed, setHeroFailed] = useState(false);

  if (!pkg)
    return (
      <NotFound
        title="Package not found"
        message="This trip may have been removed or the link is incorrect."
      />
    );
  return (
    <div className="relative mx-auto max-w-2xl">
      <Header />
      <div className="m-2 pb-40">
        {heroFailed ? (
          <div className="h-44 w-full rounded-2xl bg-gradient-to-br from-[#5dcaa5] via-[#1d9e75] to-[#0f6e56]" />
        ) : (
          <img
            src={pkg.heroPhoto}
            alt={pkg.title}
            onError={() => setHeroFailed(true)}
            className="rounded-2xl h-44 w-full object-cover"
          />
        )}
        <h1 className="text-green-text font-semibold mt-2 text-2xl leading-tight tracking-tight">
          {pkg.title}
        </h1>
        <p className="text-muted">
          {pkg.durationDays} days • {pkg.region}
        </p>
        <div className="animate-fade-in-up bg-hero-tint flex justify-between items-center p-3 my-4 rounded-lg">
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
          <div className="divide-y divide-card-border">
            {Object.entries(pkg.inclusions ?? {}).map(([key, value]) => {
              const Icon = getInclusionIcon(key);
              return (
                <div key={key} className="flex items-start gap-3 py-3">
                  <span className="shrink-0 rounded-full bg-hero-tint p-2 text-green-text">
                    <Icon size={16} />
                  </span>
                  <div>
                    <p className="font-semibold">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </p>
                    <p className="text-muted text-sm">{value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <PhotoGallery photos={pkg.photos} title={pkg.title} />
      </div>

      <div className="fixed bottom-0 z-10 border-t border-card-border bg-hero-tint left-1/2 -translate-x-1/2 w-full max-w-2xl">
        <div className="mx-2 my-4 flex flex-col justify-center">
          <Link
            to={`/Form/${id}`}
            className="bg-green-text text-white rounded-xl py-4 px-2 text-center font-semibold shadow-sm transition-colors duration-200 hover:bg-green-deep active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-btn focus-visible:ring-offset-2"
          >
            Enquire about this trip
          </Link>

          <a
            href={TEL_HREF}
            className="flex items-center gap-1 justify-center mt-2 text-green-text rounded-md transition-opacity duration-200 hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-btn"
          >
            <Phone size={14} /> <span>Prefer to talk? Call us</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
