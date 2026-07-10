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

  const pillBase =
    "p-2 px-6 rounded-full shrink-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-btn focus-visible:ring-offset-2";
  const pillActive = `${pillBase} bg-green-btn text-white shadow-sm scale-[1.02]`;
  const pillInactive = `${pillBase} border border-green-btn text-green-text hover:bg-hero-tint active:scale-95`;

  return (
    <div className="">
      <Header />
      <div className="relative overflow-hidden bg-hero-tint px-4 py-12 sm:py-16 text-center text-green-deep">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-green-btn/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-green-text/10 blur-3xl"
        />
        <div className="relative max-w-6xl mx-auto">
          <h1 className="animate-fade-in-up font-semibold text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight">
            Go pack your things.
            <br />
            We'll handle the rest.
          </h1>
          <p
            className="animate-fade-in-up text-green-text font-medium mt-3"
            style={{ animationDelay: "120ms" }}
          >
            Real trips, honest prices, zero hassle.
          </p>
        </div>
      </div>

      <div
        role="group"
        aria-label="Filter packages by category"
        className="m-4 max-w-6xl mx-auto flex gap-2 overflow-x-auto flex-nowrap pb-1"
      >
        <button
          key={"All"}
          aria-pressed={selected === "All"}
          className={selected === "All" ? pillActive : pillInactive}
          onClick={() => setSelected("All")}
        >
          All
        </button>
        {pkgCatg.map((catg) => (
          <button
            key={catg}
            aria-pressed={selected === catg}
            onClick={() => setSelected(catg)}
            className={selected === catg ? pillActive : pillInactive}
          >
            {catg}
          </button>
        ))}
      </div>

      <p className="flex items-center gap-1.5 px-4 max-w-6xl mx-auto text-green-text font-semibold">
        <MapPin size={18} /> <span>Popular near you</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4 max-w-6xl mx-auto">
        {visiblePackages.map((pkg, index) => (
          <PackageCard package={pkg} index={index} key={pkg.id} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
