import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashBoard from "./pages/Dashboard";
import PackageDetail from "./pages/PackageDetail";
import Login from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="DashBoard" element={<DashBoard />} />
        <Route path="Login" element={<Login />} />
        <Route path="PackageDetail/:id" element={<PackageDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
