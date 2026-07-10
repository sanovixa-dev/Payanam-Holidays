import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashBoard from "./pages/Dashboard";
import PackageDetail from "./pages/PackageDetail";
import Login from "./pages/Login";
import Form from "./pages/Form";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ProtectedRoute";
const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
