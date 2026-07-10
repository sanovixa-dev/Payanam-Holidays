import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import Header from "./Header";

type NotFoundProps = {
  title?: string;
  message?: string;
};

const NotFound = ({
  title = "Page not found",
  message = "The page you're looking for doesn't exist or may have moved.",
}: NotFoundProps) => {
  return (
    <div className="min-h-screen bg-section-bg">
      <Header />
      <div className="flex flex-col items-center justify-center text-center gap-3 px-4 py-24">
        <div className="rounded-full bg-green-btn/10 p-4">
          <Compass className="text-green-text" size={28} />
        </div>
        <h1 className="font-semibold text-green-deep text-xl">{title}</h1>
        <p className="text-muted max-w-xs">{message}</p>
        <Link
          to="/"
          className="mt-2 bg-green-btn text-white px-5 py-2.5 rounded-xl transition-colors duration-200 hover:bg-green-text active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-btn focus-visible:ring-offset-2"
        >
          Back to packages
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
