import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { packages } from "../data/packages";
import Header from "../components/Header";
import NotFound from "../components/NotFound";
import { toast } from "react-hot-toast";
const Form = () => {
  const { id } = useParams();
  const pkg = packages.find((p) => p.id === id);
  const [formData, setformData] = useState({
    name: "",
    phone: "",
    travel_date: "",
    number_of_people: "",
    message: "",
    package: id,
  });
  if (!pkg)
    return (
      <NotFound
        title="Package not found"
        message="This trip may have been removed or the link is incorrect."
      />
    );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setformData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.number_of_people.trim()) {
      toast.error("Please enter number of people");
      return;
    }
    if (Number(formData.number_of_people) <= 0) {
      toast.error("Please valid number of people");
      return;
    }
    if (!formData.travel_date.trim()) {
      toast.error("Please enter travel date");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone.trim())) {
      toast.error("Enter vaild mobile number");
      return;
    }

    try {
      const send = await fetch(
        `${import.meta.env.VITE_API_URL}/api/enquiries`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      if (send.ok) {
        toast.custom(() => (
          <div className="bg-green-deep text-white px-5 py-4 rounded-xl shadow-lg max-w-sm">
            <p className="font-semibold">Enquiry sent! 🎉</p>
            <p className="text-sm text-hero-tint mt-1">
              {pkg.title} — we'll call you back within a day.
            </p>
          </div>
        ));
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Couldn't reach the server. Check your connection.");
    }
  };
  return (
    <div className="min-h-screen bg-section-bg">
      <Header />

      <form
        onSubmit={handleSubmit}
        className="animate-fade-in-up flex flex-col max-w-lg mx-auto my-8 p-6 gap-4 bg-white border border-card-border shadow-md rounded-2xl"
      >
        <p className="bg-hero-tint p-3 rounded-md text-green-text">
          Enquiring about: {pkg?.title}
        </p>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-medium text-sm text-ink">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className=" border border-card-border px-3 py-2 rounded-lg focus:border-green-btn focus:ring-1 focus:ring-green-btn focus:outline-none"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="font-medium text-sm text-ink">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="border border-card-border px-3 py-2 rounded-lg focus:border-green-btn focus:ring-1 focus:ring-green-btn focus:outline-none"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          {" "}
          <label htmlFor="travel_date" className="font-medium text-sm text-ink">
            Travel Date <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="travel_date"
            name="travel_date"
            className="border border-card-border px-3 py-2 rounded-lg focus:border-green-btn focus:ring-1 focus:ring-green-btn focus:outline-none"
            value={formData.travel_date}
            onChange={handleChange}
            placeholder="e.g. July Mid or August End"
          />
        </div>
        <div className="flex flex-col gap-1">
          {" "}
          <label
            htmlFor="number_of_people"
            className="font-medium text-sm text-ink"
          >
            Number of People <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="number_of_people"
            name="number_of_people"
            className="border border-card-border px-3 py-2 rounded-lg focus:border-green-btn focus:ring-1 focus:ring-green-btn focus:outline-none"
            value={formData.number_of_people}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          {" "}
          <label htmlFor="message" className="font-medium text-sm text-ink">
            Message
          </label>
          <textarea
            rows={4}
            id="message"
            name="message"
            className="border border-card-border px-3 py-2 rounded-lg focus:border-green-btn focus:ring-1 focus:ring-green-btn focus:outline-none"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Personal Preference to make your trip more personal"
          />
        </div>
        <button
          type="submit"
          className="bg-green-btn text-white py-3 rounded-xl font-semibold w-full hover:bg-green-text active:scale-95 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-btn focus-visible:ring-offset-2"
        >
          Request a callback
        </button>
      </form>
    </div>
  );
};

export default Form;
