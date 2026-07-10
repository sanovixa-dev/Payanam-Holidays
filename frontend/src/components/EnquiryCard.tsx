import React from "react";
import type { Enquiry } from "../pages/Dashboard";
import { MapPin } from "lucide-react";
const EnquiryCard = (props: { enquiry: Enquiry }) => {
  console.log("====================================");
  console.log(props.enquiry.id);
  console.log("====================================");
  const {
    id,
    name,
    phone,
    package_id,
    travel_dates,
    number_of_people,
    message,
    delivery_status,
    created_at,
    delivered_at,
  } = props.enquiry;

  return (
    <div className="max-w-2xl shadow-md p-4 flex-wrap border border-card-border rounded-xl">
      <div className="flex justify-between items-start">
        <div>
          <a
            href={`tel:${phone}`}
            className="font-semibold text-2xl text-green-text"
          >
            {phone}
          </a>
          <p className="font-semibold text-lg">{name}</p>
        </div>
        <p
          className={
            delivery_status === "sent"
              ? "bg-green-btn/10 text-green-text py-2 px-3 rounded-lg"
              : delivery_status === "failed"
                ? "bg-red-100 text-red-600  py-2 px-3 rounded-lg"
                : "bg-gray-100 text-gray-600  py-2 px-3 rounded-lg"
          }
        >
          {delivery_status}
        </p>
      </div>

      <p className="flex items-center text-muted gap-1">
        <MapPin className="" size={14} />
        <span>{package_id}</span>
      </p>
      <p className="text-muted">
        {travel_dates} • {number_of_people} people
      </p>
      <p className="bg-section-bg p-2 rounded-lg my-2">
        {message ? message : "Nil"}
      </p>

      <p>
        {created_at.split("T")[0]} •
        {created_at.slice(created_at.indexOf("T") + 1, created_at.indexOf("."))}
      </p>
    </div>
  );
};

export default EnquiryCard;
