import type { Enquiry } from "../pages/Dashboard";
import { MapPin } from "lucide-react";

function formatTimestamp(iso: string) {
  const [date, time] = iso.split("T");
  return `${date} • ${time.slice(0, time.indexOf("."))}`;
}

const EnquiryCard = (props: { enquiry: Enquiry }) => {
  const {
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
    <div className="max-w-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 flex-wrap border border-card-border rounded-xl bg-white">
      <div className="flex justify-between items-start gap-2">
        <div>
          <a
            href={`tel:${phone}`}
            className="font-semibold text-2xl text-green-text rounded-md transition-opacity duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-btn"
          >
            {phone}
          </a>
          <p className="font-semibold text-lg">{name}</p>
        </div>
        <p
          className={
            delivery_status === "sent"
              ? "bg-green-btn/10 text-green-text py-2 px-3 rounded-lg text-sm font-medium shrink-0"
              : delivery_status === "failed"
                ? "bg-red-100 text-red-600 py-2 px-3 rounded-lg text-sm font-medium shrink-0"
                : "bg-gray-100 text-gray-600 py-2 px-3 rounded-lg text-sm font-medium shrink-0"
          }
        >
          {delivery_status}
        </p>
      </div>

      <p className="flex items-center text-muted gap-1 mt-2">
        <MapPin size={14} />
        <span>{package_id}</span>
      </p>
      <p className="text-muted">
        {travel_dates} • {number_of_people} people
      </p>
      <p className="bg-section-bg p-2 rounded-lg my-2">
        {message ? message : "Nil"}
      </p>

      <p className="text-faint text-sm">
        Enquired {formatTimestamp(created_at)}
        {delivery_status === "sent" && delivered_at && (
          <> • Delivered {formatTimestamp(delivered_at)}</>
        )}
      </p>
    </div>
  );
};

export default EnquiryCard;
