import { Routes, Route } from "react-router-dom"

// USER
import Login from "./pages/User/Login"
import Home from "./pages/User/Home"
import BayarTagihan from "./pages/User/BayarTagihan"
import ActivateAccount from "./components/ActivateAccount"

// ADMIN
import Dashboard from "./pages/Admin/Dashbord"
import AdminLayout from "./layouts/AdminLayout"

export default function App() {
  return (
    <Routes>

      {/* USER */}
      <Route path="/" element={<ActivateAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/bayar-tagihan" element={<BayarTagihan />} />

      {/* ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
      </Route>

    </Routes>
  )
}