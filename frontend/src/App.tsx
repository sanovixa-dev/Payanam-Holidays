import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashBoard from "./pages/Dashboard";
import PackageDetail from "./pages/PackageDetail";
import Login from "./pages/Login";
import Form from "./pages/Form";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ProtectedRoute";
import ScrollToTop from "./ScrollToTop";
import NotFound from "./components/NotFound";
const App = () => {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#04342C",
            color: "#fff",
            borderRadius: "12px",
            padding: "12px 16px",
            fontFamily: "Inter, sans-serif",
          },
          success: { iconTheme: { primary: "#1D9E75", secondary: "#fff" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
        }}
      />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/DashBoard"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/PackageDetail/:id" element={<PackageDetail />} />
          <Route path="/Form/:id" element={<Form />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
