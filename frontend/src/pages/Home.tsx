import { useMemo, useState } from "react";
import Header from "../components/Header";
import { PackageCard } from "../components/PackageCard";
import { packages } from "../data/packages";
import { MapPin } from "lucide-react";
import Footer from "../components/Footer";
const Home = () => {
  const pkgCatg = useMemo(
    () => [...new Set(packages.map((pkg) => pkg.category))],
    [],
  );
  const [selected, setSelected] = useState("All");
  const visiblePackages = useMemo(
    () =>
      selected === "All"
        ? packages
        : packages.filter((pkg) => pkg.category === selected),
    [selected],
  );

  return (
    <div className="">
      <Header />
      <div className="bg-hero-tint px-4 py-10 sm:py-14 text-center text-green-deep">
        <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight">
          Go pack your things.
          <br />
          We'll handle the rest.
        </h1>
        <p className="text-green-text font-medium mt-3">
          Real trips, honest prices, zero hassle.
        </p>
      </div>

      <div
        role="group"
        aria-label="Filter packages by category"
        className="m-4 flex gap-2 overflow-x-auto flex-nowrap pb-1"
      >
        <button
          key={"All"}
          aria-pressed={selected === "All"}
          className={
            selected === "All"
              ? "bg-green-btn text-white p-2 px-6 rounded-full shrink-0 transition-colors duration-200"
              : "border border-green-btn text-green-text p-2 px-6 rounded-full shrink-0 transition-colors duration-200 hover:bg-hero-tint active:scale-95"
          }
          onClick={() => setSelected("All")}
        >
          All
        </button>
        {pkgCatg.map((catg) => (
          <button
            key={catg}
            aria-pressed={selected === catg}
            onClick={() => setSelected(catg)}
            className={
              selected === catg
                ? "bg-green-btn text-white p-2 px-6 rounded-full shrink-0 transition-colors duration-200"
                : "border border-green-btn text-green-text p-2 px-6 rounded-full shrink-0 transition-colors duration-200 hover:bg-hero-tint active:scale-95"
            }
          >
            {catg}
          </button>
        ))}
      </div>

      <p className="flex items-center gap-1.5 px-4 text-green-text font-semibold">
        <MapPin size={18} /> <span>Popular near you</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
        {visiblePackages.map((pkg, index) => (
          <PackageCard package={pkg} index={index} key={pkg.id} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
