import { useNavigate } from "react-router-dom";
import Gedung from "../assets/Login/Gedung.svg";
import Logo from "../assets/Login/Logo.svg";
import Water from "../assets/Login/Water.svg";
import Mobile from "../assets/Login/Mobile.svg";

export default function ActivateAccount() {
  const navigate = useNavigate();

  const handleActivate = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen font-geist bg-[#F3F4F6]">

{/* ================= MOBILE ================= */}
<div className="block md:hidden min-h-screen bg-[#F3F4F6]">

  {/* HEADER */}
  <div className="relative h-[254px] px-6 pt-12 bg-gradient-to-b from-[#0096FF] to-[#0022FF] overflow-hidden">
   {/* TEXT AREA */}
<div className="max-w-[190px]">

  {/* LOGO */}
<div className="mt-[22px] mb-4">
  <img src={Logo} alt="Aquora Logo" className="h-7 w-auto object-contain" />
</div>

{/* DESCRIPTION */}
<p className="mt-4 text-white text-[12px] leading-[20px] w-[228px] h-[108px]">
  Aquora membantu kamu memantau
  penggunaan air secara real-time dan
  membayar tagihan dengan lebih
  transparan dan praktis.
</p>
</div>
    {/* GEDUNG */}
   <div className="absolute right-0 -bottom-4 w-[240px]">
  <img src={Mobile} alt="Gedung" className="w-full h-auto object-contain" />
</div>

  </div>


  {/* FLOATING CARD */}
  <div
    className="
      relative
      -mt-18
      bg-[#F3F4F6]
      rounded-t-[12px]
      px-4
      pt-8
      pb-10
      shadow-[0_-10px_30px_rgba(0,0,0,0.15)]
      z-10
    "
  >

    {/* ICON */}
    <div className="mb-4">
      <img src={Water} alt="Water Icon" className="w-8 h-8" />
    </div>

    {/* TITLE */}
    <h1 className="text-[22px] font-semibold text-[#0F172A] mb-2">
      Aktivasi Akun Anda
    </h1>

    <p className="text-[14px] text-[#64748B] mb-5">
      Silakan buat kata sandi untuk mulai menggunakan Aquora.
    </p>


    {/* INFO BOX */}
    <div className="bg-[#E2E8F0] rounded-[14px] p-4 mb-6 text-[13px]">

      <div className="flex justify-between mb-2">
        <span>Email</span>
        <span className="font-medium">
          christian@gmail.com
        </span>
      </div>

      <div className="flex justify-between">
        <span>Unit</span>
        <span className="font-medium">
          A-1203
        </span>
      </div>

    </div>


    {/* PASSWORD */}
    <div className="mb-4">
      <label className="block text-[13px] font-medium mb-1">
        Kata sandi
      </label>

      <input
        type="password"
        placeholder="Masukan kata sandi"
        className="w-full h-[44px] px-3 rounded-[12px] border border-[#CBD5E1] bg-white"
      />
    </div>


    {/* CONFIRM PASSWORD */}
    <div className="mb-6">
      <label className="block text-[13px] font-medium mb-1">
        Konfirmasi kata sandi
      </label>

      <input
        type="password"
        placeholder="Konfirmasi kata sandi"
        className="w-full h-[44px] px-3 rounded-[12px] border border-[#CBD5E1] bg-white"
      />
    </div>


    {/* BUTTON */}
   <button
  onClick={handleActivate}
  className="
    w-full h-[48px]
    rounded-[14px]
    text-white text-[15px] font-medium
    bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#3B82F6]
    shadow-[0_8px_20px_rgba(37,99,235,0.35)]
    active:scale-[0.97]
    transition-all duration-200
  "
>
  Aktivasi & Masuk
</button>

  </div>

</div>
      {/* ================= DESKTOP (UNCHANGED) ================= */}
      <div className="hidden md:flex min-h-screen">

        {/* ================= LEFT ================= */}
        <div className="
          w-full 
          md:w-[55%] 
          xl:w-1/2 
          flex items-center justify-center 
          px-6 md:px-12 xl:px-24
        ">
          <div className="w-full max-w-[420px]">

            <div className="mb-10">
              <img src={Water} alt="Water Icon" className="w-12 h-12" />
            </div>

            <h1 className="text-[40px] leading-[48px] font-semibold text-[#0F172A] mb-4">
              Aktivasi Akun Anda
            </h1>

            <p className="text-[18px] text-[#64748B] mb-10">
              Silakan buat kata sandi untuk mulai menggunakan Aquora.
            </p>

            <div className="bg-[#E2E8F0] rounded-[14px] p-6 mb-10">
              <div className="flex justify-between mb-4 text-[16px]">
                <span className="text-[#334155]">Email</span>
                <span className="font-medium text-[#0F172A]">
                  christian@gmail.com
                </span>
              </div>
              <div className="flex justify-between text-[16px]">
                <span className="text-[#334155]">Unit</span>
                <span className="font-medium text-[#0F172A]">
                  A-1203
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-[16px] font-medium text-[#0F172A] mb-2">
                Kata sandi
              </label>
              <input
                type="password"
                placeholder="Masukan kata sandi"
                className="w-full h-[52px] px-5 rounded-[12px] border border-[#CBD5E1]"
              />
            </div>

            <div className="mb-10">
              <label className="block text-[16px] font-medium text-[#0F172A] mb-2">
                Konfirmasi kata sandi
              </label>
              <input
                type="password"
                placeholder="Konfirmasi kata sandi"
                className="w-full h-[52px] px-5 rounded-[12px] border border-[#CBD5E1]"
              />
            </div>

            <button
              onClick={handleActivate}
              className="
                w-full h-[56px]
                rounded-[14px]
                text-white text-[20px] font-medium
                bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#3B82F6]
                shadow-[0_8px_20px_rgba(37,99,235,0.35)]
                hover:shadow-[0_10px_25px_rgba(37,99,235,0.45)]
                hover:brightness-105
                active:scale-[0.98]
                transition-all duration-300
              "
            >
              Aktivasi & Masuk
            </button>

          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="
          md:w-[45%] 
          xl:w-1/2 
          relative
          bg-gradient-to-b 
          from-[#0096FF] 
          to-[#0022FF]
          overflow-hidden
        ">

          <div className="absolute top-16 left-20 flex items-center gap-5">
            <img src={Logo} alt="Aquora Logo" className="h-[64px] w-auto" />
          </div>

          <div className="absolute top-40 left-16 max-w-[560px]">
            <p className="text-white text-[24px] leading-[32px] font-medium">
              Aquora membantu kamu memantau penggunaan air secara real-time dan
              membayar tagihan dengan lebih transparan dan praktis.
            </p>
          </div>

          <div className="absolute bottom-0 right-0">
            <img src={Gedung} alt="Gedung Illustration" />
          </div>

        </div>
      </div>

    </div>
  );
}