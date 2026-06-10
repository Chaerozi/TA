import Water from "../../assets/Login/Water.svg"

import Call from "../../assets/Landing/Cal.svg"
import Sms from "../../assets/Landing/Sms.svg"
import Copyright from "../../assets/Landing/copyright.svg"

export default function Footer() {
  return (
<footer
  id="contact"
  className="w-full overflow-hidden"
  style={{
    background: `
      radial-gradient(circle at top, rgba(113,179,255,0.45) 0%, rgba(113,179,255,0) 40%),
      linear-gradient(180deg, #4D8FFF 0%, #1D32FF 100%)
    `,
  }}
>

  <div className="max-w-[1600px] mx-auto px-6 lg:px-[80px] pt-[56px] lg:pt-[70px] pb-[48px] lg:pb-[58px]">

    {/* ================= TOP SECTION ================= */}
    <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-14">

      {/* ================= LEFT ================= */}
      <div>

        {/* LOGO */}
        <div className="flex items-center gap-3 lg:gap-4">

          <img
            src={Water}
            alt="Aquora"
            className="w-[42px] h-[42px] lg:w-[48.47px] lg:h-[48.47px] object-contain"
          />

          <h2 className="text-white text-[32px] lg:text-[37px] font-semibold tracking-[-1px]">

            Aquora
          </h2>

        </div>

        {/* DESCRIPTION */}
        <p className="mt-5 lg:mt-8 max-w-[650px] text-[15px] lg:text-[16px] leading-[175%] text-white/55">

          Aquora membantu kamu memantau penggunaan air secara real-time
          dan membayar tagihan dengan lebih transparan dan praktis.

        </p>

      </div>

      {/* ================= RIGHT NAV ================= */}
      <div className="flex items-center gap-8 lg:gap-16 pt-2 lg:pt-6 flex-wrap">

       <a
  href="#home"
  className="text-white text-[15px] lg:text-[16px] font-medium hover:opacity-80 transition"
>
  Home
</a>

<a
  href="#about"
  className="text-white text-[15px] lg:text-[16px] font-medium hover:opacity-80 transition"
>
  About
</a>

<a
  href="#contact"
  className="text-white text-[15px] lg:text-[16px] font-medium hover:opacity-80 transition"
>
  Contact Us
</a>

      </div>

    </div>

    {/* ================= LINE ================= */}
    <div className="w-full h-[1px] bg-white/15 mt-[40px] lg:mt-[55px]" />

    {/* ================= BOTTOM SECTION ================= */}
    <div className="mt-[40px] lg:mt-[55px] flex flex-col lg:flex-row justify-between gap-10 lg:gap-14">

      {/* ================= CONTACT ================= */}
      <div>

        <h3 className="text-white text-[16px] font-semibold">

          Get in touch

        </h3>

        {/* PHONE */}
        <div className="mt-7 flex items-center gap-4">

          <img
            src={Call}
            alt="Call"
            className="w-[18px] h-[18px] object-contain"
          />

          <p className="text-white text-[15px] lg:text-[16px]">

            +133 11234

          </p>

        </div>

        {/* EMAIL */}
        <div className="mt-5 lg:mt-7 flex items-center gap-4">

          <img
            src={Sms}
            alt="Email"
            className="w-[18px] h-[18px] object-contain"
          />

          <p className="text-white text-[15px] lg:text-[16px] break-all">

            admin@cakinvestment.com

          </p>

        </div>

      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="flex items-center gap-2 lg:pt-[20px] lg:pr-[20px]">

        <img
          src={Copyright}
          alt="Copyright"
          className="w-[16px] h-[16px] object-contain"
        />

        <p className="text-white text-[14px] lg:text-[16px]">

          Copyright Aquora 2026

        </p>

      </div>

    </div>

  </div>

</footer>
  )
}