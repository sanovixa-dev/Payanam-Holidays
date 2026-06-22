import { useState } from "react";
import Header from "../components/Header";
import { PackageCard } from "../components/PackageCard";
import { packages } from "../data/packages";
import { MapPin } from "lucide-react";
import Footer from "../components/Footer";
const Home = () => {
  const pkgCatg = [...new Set(packages.map((pkg) => pkg.category))];
  const [selected, setSelected] = useState("All");
  const visiblePackages =
    selected === "All"
      ? packages
      : packages.filter((selectedCatg) => selectedCatg.category === selected);
  return (
    <div className="">
      <Header />
      <div className="bg-hero-tint p-4 py-8 text-center text-green-deep">
        <h1 className="font-semibold text-2xl">Go pack your things.</h1>
        <h1 className="font-semibold text-2xl">We'll handle the rest.</h1>
        <h3 className="text-green-text font-medium">
          Real trips, honest prices, zero hassle.
        </h3>
      </div>

      <div className="m-4 flex gap-2">
        <button
          key={"All"}
          className={
            selected === "All"
              ? "bg-green-btn text-white p-2 px-6 rounded-full"
              : "border border-green-btn text-green-text p-2 px-6 rounded-full"
          }
          onClick={() => setSelected("All")}
        >
          All
        </button>
        {pkgCatg.map((catg) => (
          <button
            key={catg}
            onClick={() => setSelected(catg)}
            className={
              selected === catg
                ? "bg-green-btn text-white p-2 px-6 rounded-full"
                : "border border-green-btn text-green-text p-2 px-6 rounded-full"
            }
          >
            {catg}
          </button>
        ))}
      </div>

      <p className="flex px-4 text-green-text font-semibold">
        <MapPin /> <span>Popular near you</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {visiblePackages.map((pkg, index) => (
          <PackageCard package={pkg} index={index} key={pkg.id} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
