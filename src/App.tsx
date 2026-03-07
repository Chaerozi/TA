import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ActivateAccount from "./components/ActivateAccount";
import BayarTagihan from "./pages/BayarTagihan";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ActivateAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/bayar-tagihan" element={<BayarTagihan />} />

    </Routes>
  );
}