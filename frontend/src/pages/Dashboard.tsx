import { useEffect, useState } from "react";
import EnquiryCard from "../components/EnquiryCard.tsx";
import toast from "react-hot-toast";
import { Inbox, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
export type Enquiry = {
  id: number;
  name: string;
  phone: string;
  package_id: string;
  travel_dates: string;
  number_of_people: number;
  message: string;
  delivery_status: string;
  created_at: string;
  delivered_at: string;
};
const DashBoard = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [status, setStatus] = useState<"loading" | "ready">("loading");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchEnquiries() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/enquiries`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await res.json();
        setEnquiries(data.enquiries ?? []);
      } catch (err) {
        toast.error(`Something went wrong`);
      } finally {
        setStatus("ready");
      }
    }
    fetchEnquiries();
  }, []);
  function logout() {
    localStorage.removeItem("token");
    navigate("/Login");
  }

  return (
    <div className="relative min-h-screen bg-section-bg">
      <nav className="w-full bg-green-deep text-white flex p-4 justify-between items-center fixed z-20 shadow-md">
        <div className="max-w-6xl w-full mx-auto flex justify-between items-center">
          <h1 className="font-semibold">Enquiries</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-md px-2 py-1 transition-colors duration-200 hover:bg-white/10 hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <LogOut size={18} /> <span>Log out</span>
          </button>
        </div>
      </nav>

      {status === "loading" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-20 p-4 max-w-6xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-40 rounded-xl border border-card-border bg-white animate-pulse"
            />
          ))}
        </div>
      ) : enquiries.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center gap-3 pt-32 px-4">
          <div className="rounded-full bg-green-btn/10 p-4">
            <Inbox className="text-green-text" size={28} />
          </div>
          <h2 className="font-semibold text-green-deep text-lg">
            No enquiries yet
          </h2>
          <p className="text-muted max-w-xs">
            New enquiries from customers will show up here as soon as they
            come in.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-20 p-4 max-w-6xl mx-auto">
          {enquiries.map((enq) => (
            <EnquiryCard key={enq.id} enquiry={enq} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashBoard;
