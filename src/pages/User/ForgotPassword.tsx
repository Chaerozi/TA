import Gedung from "../../assets/Login/New.svg";
import Teks from "../../assets/Login/TeksAquora.svg";
import Logo from "../../assets/adminDasbord/Logo.svg";
import Berhasil from "../../assets/adminDasbord/Berhasil.svg";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] =
  useState(false);

  const handleReset = async () => {

  if (!email) {
    alert("Masukkan email terlebih dahulu");
    return;
  }

  try {

    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/forgot-password",
      {
        email,
      }
    );

    localStorage.setItem(
      "resetToken",
      response.data.token
    );

    setShowSuccessPopup(true);

  } catch (error: any) {

    alert(
      error.response?.data?.message ||
      "Gagal mengirim link reset"
    );

  }

};

  return (

<div className="min-h-screen bg-[#E5E7EB] flex items-start justify-center md:py-10">

      <div className="w-full max-w-[430px] min-h-screen md:min-h-0 md:overflow-hidden md:shadow-[0_32px_80px_rgba(0,0,0,0.25)] bg-[#F3F4F6]">

        {/* HEADER */}
        <div className="relative h-[254px] px-6 pt-14 bg-gradient-to-b from-[#0096FF] to-[#0022FF] overflow-hidden">

          {/* LOGO */}
          <div className="mt-2 mb-2">
            <img
              src={Teks}
              alt="Aquora Logo"
              className="h-7 w-auto object-contain"
            />
          </div>

          {/* DESCRIPTION */}
          <p className="mt-4 text-white text-[12px] leading-[18px] w-[225px]">
            Aquora membantu kamu memantau
            penggunaan air secara real-time dan
            membayar tagihan dengan lebih
            transparan dan praktis.
          </p>

          {/* GEDUNG */}
          <div className="absolute right-0 bottom-0 w-[215px] h-[215px]">
            <img
              src={Gedung}
              alt="Gedung"
              className="w-full h-full object-contain"
            />
          </div>

        </div>

        {/* FORM */}
        <div className="relative z-20 -mt-[24px] rounded-t-[12px] bg-[#F3F4F6] px-4 pt-8 pb-10">

          {/* ICON */}
          <div className="mb-4">
            <img
              src={Logo}
              alt="Logo"
              className="w-[38px] h-[38px] object-contain"
            />
          </div>

          {/* TITLE */}
          <h1 className="text-[24px] font-bold text-[#1B2340]">
            Lupa Kata Sandi
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-2 text-[#8B93A7] text-[14px] leading-[24px] w-[320px]">
            Masukkan email yang terdaftar untuk menerima link reset password.
          </p>

          {/* FORM INPUT */}
          <div className="mt-10">

            {/* EMAIL */}
            <div>
              <label className="block text-[14px] font-semibold text-[#1B2340] mb-2">
                Masukan Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Masukan email"
                className="
                  w-full
                  h-[48px]
                  rounded-[12px]
                  border
                  border-[#D9E0EE]
                  bg-white
                  px-4
                  text-[14px]
                  text-[#1B2340]
                  outline-none
                  focus:border-[#2563FF]
                "
              />
            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={handleReset}
            className="
              w-full
              h-[40px]
              rounded-[34px]
              flex
              items-center
              justify-center
              text-white
              text-[14px]
              font-medium
              mt-8
              transition-all
              active:scale-[0.98]
            "
            style={{
              background:
                "radial-gradient(108.89% 108.89% at 50% 48.61%, #3FACFF 0%, #0034FF 100%), linear-gradient(180deg, #3FACFF -2.78%, #0034FF 100%), #2173FF",
              boxShadow:
                "0px 4px 4px rgba(1, 101, 255, 0.2), inset 0px -4px 4px rgba(255, 255, 255, 0.2)",
            }}
          >
            Kirim Link Reset
          </button>

        </div>
{/* POPUP RESET PASSWORD */}
{showSuccessPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-6">

    <div
      className="
        w-[272px]
        rounded-[16px]
        bg-white
        px-6
        pt-7
        pb-6
        shadow-xl
      "
    >

      {/* ICON */}
      <div className="flex justify-center">
        <img
          src={Berhasil}
          alt="Berhasil"
          className="w-[72px] h-[72px] object-contain"
        />
      </div>

      {/* TITLE */}
      <h2 className="mt-5 text-center text-[18px] font-bold text-[#1B2340] leading-[28px]">
        Email Reset Password Terkirim
      </h2>

      {/* DESC */}
      <p className="mt-2 text-center text-[14px] leading-[24px] text-[#8B93A7]">
        Buka link yang sudah kami kirimkan untuk mereset password kamu
      </p>

      {/* BUTTON */}
      <button
  onClick={() => {

    setShowSuccessPopup(false);

    navigate("/reset-password");

  }}
  className="
    mt-6
    h-[40px]
    w-full
    rounded-[34px]
    text-[14px]
    font-medium
    text-white
    transition-all
    active:scale-[0.98]
  "
  style={{
    background:
      "radial-gradient(108.89% 108.89% at 50% 48.61%, #3FACFF 0%, #0034FF 100%), linear-gradient(180deg, #3FACFF -2.78%, #0034FF 100%), #2173FF",
    boxShadow:
      "0px 4px 4px rgba(1, 101, 255, 0.2), inset 0px -4px 4px rgba(255, 255, 255, 0.2)",
  }}
>
  Kembali
</button>

    </div>
  </div>
)}
      </div>

    </div>

  );
}