import React, { useEffect, useState } from "react";
import EnquiryCard from "../components/enquiryCard.tsx";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";
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
        setEnquiries(data.enquiries);
      } catch (err) {
        toast.error(`Something went wrong`);
      }
    }
    fetchEnquiries();
  }, []);
  function logout() {
    localStorage.removeItem("token");
    navigate("/Login");
  }
  if (enquiries.length === 0) return <>No enquiries found</>;
  return (
    <div className="relative">
      <nav className="w-full bg-green-deep text-white flex p-4 justify-between fixed ">
        <h1>Enquiries</h1>
        <button onClick={logout} className="flex hover:cursor-pointer">
          <LogOut /> <span>Log out</span>
        </button>
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-16 p-4">
        {enquiries.map((enq) => (
          <EnquiryCard key={enq.id} enquiry={enq} />
        ))}
      </div>
    </div>
  );
};

export default DashBoard;
