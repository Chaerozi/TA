import { Routes, Route } from "react-router-dom"

//Landing
import LandingPage from "./pages/Landing/LandingPage"

// USER
import Login from "./pages/User/Login"
import Home from "./pages/User/Home"
import BayarTagihan from "./pages/User/BayarTagihan"
import MetodePembayaran from "./pages/User/MetodePembayaran"
import Payment from "./pages/User/Payment"
import PaymentSuccess from "./pages/User/PaymentSuccess"
import Register from "./pages/User/Register"
import ActivateAccount from "./components/ActivateAccount"
import ProtectedRoute from "./components/ProtectRoute";
import ForgotPassword from "./pages/User/ForgotPassword"
import ResetPassword from "./pages/User/ResetPassword";
import Ticketing from "./pages/User/Ticketing";

// ADMIN
import LoginAdmin from "./pages/Admin/LoginAdmin";
import Dashboard from "./pages/Admin/Dashbord"
import AdminLayout from "./layouts/AdminLayout"
import Monitoring from "./pages/Admin/Monitoring"
import Billing from "./pages/Admin/Billing"
import Pesan from "./pages/Admin/Pesan"

export default function App() {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />

      {/* USER */}
    <Route path="/register" element={<Register />} />
     <Route path="/login" element={<Login />} />
<Route
  path="/activate-account"
  element={<ActivateAccount />}
/>
      <Route path="/login" element={<Login />} />
      <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
<Route
  path="/reset-password"
  element={<ResetPassword />}
/>
      <Route
  path="/home"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>
      <Route path="/bayar-tagihan" element={<BayarTagihan />} />
      <Route path="/metode-pembayaran" element={<MetodePembayaran />} />
      <Route path="/qris-payment" element={<Payment />} />
      <Route
  path="/payment-success"
  element={<PaymentSuccess />}
/>
<Route path="/ticketing" element={<Ticketing />} />
      {/* ADMIN */}
      <Route path="/admin-login" element={<LoginAdmin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="monitoring" element={<Monitoring />} />
        <Route path="billing" element={<Billing />} />
        <Route path="pesan" element={<Pesan />} />
      </Route>

    </Routes>
  )
}