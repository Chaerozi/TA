import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../../assets/adminDasbord/Logo.svg";
import Berhasil from "../../assets/adminDasbord/Berhasil.svg";

export default function ConnectMeter() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="min-h-screen bg-[#E5E7EB] flex justify-center">
      
      <div className="w-full max-w-[430px] min-h-screen bg-[#F3F4F6] px-4 pt-4">

        {/* STATUS BAR SPACE */}
        <div className="h-10" />

        {/* LOGO */}
        <div className="mb-5">
          <img
            src={Logo}
            alt="Logo"
            className="w-[38px] h-[38px] object-contain"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-[24px] font-bold text-[#1B2340]">
          Hubungkan ID Meter
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-2 text-[#8B93A7] text-[14px] leading-[24px] w-[380px]">
          Hubungkan ID meter yang sudah diberikan oleh admin dan tulis sesuai nama unit kamu
        </p>

        {/* FORM */}
        <div className="mt-8 space-y-5">

          {/* ID METER */}
          <div>
            <label className="block text-[15px] font-semibold text-[#1B2340] mb-2">
              ID Meter
            </label>

            <input
              type="text"
              className="
                w-full
                h-[48px]
                rounded-[12px]
                border
                border-[#D9E0EE]
                bg-white
                px-6
                text-[14px]
                text-[#1B2340]
                outline-none
                focus:border-[#2563FF]
              "
            />
          </div>

          {/* NAMA UNIT */}
          <div>
            <label className="block text-[15px] font-semibold text-[#1B2340] mb-2">
              Nama Unit
            </label>

            <input
              type="text"
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
  onClick={() => setShowPopup(true)}
  className="
    w-[362px]
    h-[40px]
    rounded-[34px]
    flex
    items-center
    justify-center
    text-white
    text-[12px]
    font-medium
    mt-8
    mx-auto
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
  Hubungkan
</button>

{/* POPUP BERHASIL */}
{showPopup && (
  <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/20 px-6 pt-[245px]">

    <div
      className="
        w-[272px]
        h-[258.16px]
        rounded-[12.95px]
        bg-white
        shadow-xl
        flex
        flex-col
        items-center
        pt-[22px]
      "
    >

    {/* ICON */}
<div className="flex justify-center">
  <img
    src={Berhasil}
    alt="Berhasil"
    className="w-[65.4px] h-[65.41px] object-contain"
  />
</div>

      {/* TITLE */}
      <h2 className="mt-5 text-center text-[16px] font-bold text-[#1B2340]">
        Meter Berhasil Terhubung
      </h2>

      {/* DESC */}
      <p className="mt-2 text-center text-[12px] leading-[22px] text-[#8B93A7]">
        Akun kamu sudah aktif dan siap digunakan.
      </p>

     {/* BUTTON */}
<button
  onClick={() => navigate("/home")}
  className="
    mt-6
    w-[220.19px]
    h-[38.72px]
    rounded-[22.02px]
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
  Lanjutkan
</button>
    </div>
  </div>
)}

      </div>
      
    </div>
  );
}