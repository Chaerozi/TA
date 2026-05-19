import HeroImage from "../../assets/Landing/Hero.svg"

import Telkom from "../../assets/Landing/Telkom.svg"
import Brin from "../../assets/Landing/Brin.svg"
import Rekayasa from "../../assets/Landing/Rekayasa.svg"

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white"
    >

      {/* ================= LEFT GRADIENT ================= */}
      <div
        className="absolute left-0 bottom-0 pointer-events-none"
        style={{
          width: "340px",
          height: "720px",
          background:
            "radial-gradient(circle at left bottom, rgba(191,227,255,0.95) 0%, rgba(191,227,255,0.55) 42%, rgba(191,227,255,0) 78%)",
          filter: "blur(18px)",
        }}
      />

      {/* ================= RIGHT GRADIENT ================= */}
      <div
        className="absolute right-0 bottom-0 pointer-events-none"
        style={{
          width: "340px",
          height: "720px",
          background:
            "radial-gradient(circle at right bottom, rgba(191,227,255,0.95) 0%, rgba(191,227,255,0.55) 42%, rgba(191,227,255,0) 78%)",
          filter: "blur(18px)",
        }}
      />

      {/* ================= BOTTOM SOFT BLUE ================= */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        style={{
          top: "420px",
          height: "520px",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(227,241,255,0.72) 52%, rgba(210,233,255,0.92) 100%)",
        }}
      />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 lg:px-6 pt-[42px] lg:pt-[58px]">

        {/* ================= BADGE ================= */}
        <div className="flex justify-center">

          <div
            className="
              h-[34px]
              lg:h-[38px]

              rounded-full
              bg-[#EEF6FF]

              px-[6px]

              flex
              items-center
              gap-2
            "
          >

            <div
              className="
                h-[24px]
                lg:h-[26px]

                px-3
                lg:px-4

                rounded-full
                flex
                items-center
                justify-center

                text-white
                text-[11px]
                lg:text-[12px]

                font-semibold
              "
              style={{
                background:
                  "linear-gradient(180deg, #60A5FA 0%, #2173FF 100%)",
              }}
            >
              New
            </div>

            <p className="text-[11px] lg:text-[12px] text-[#64748B] pr-2 lg:pr-3 whitespace-nowrap">
              Cek Pemakaian Air &amp; Tagihan Tanpa Ribet.
            </p>

          </div>

        </div>

        {/* ================= TITLE ================= */}
        <div className="mt-7 lg:mt-8 text-center">

          <h1
            className="
              max-w-[987px]
              mx-auto

              text-[34px]
              sm:text-[40px]
              lg:text-[48px]

              leading-[135%]
              lg:leading-[1.2]

              font-bold
              tracking-[-1.5px]
              lg:tracking-[-2px]

              text-[#0F172A]
            "
          >

            Pantau Penggunaan Air Secara{" "}

            <span className="text-[#2173FF]">
              Real-Time.
            </span>

          </h1>

          <p
            className="
              mt-5
              lg:mt-4

              max-w-[987px]
              mx-auto

              text-[16px]
              sm:text-[18px]
              lg:text-[20px]

              leading-[185%]
              lg:leading-[1.9]

              text-[#94A3B8]
            "
          >

            Dashboard smart water meter untuk penghuni dan pengelola
            hunian vertikal. Pantau konsumsi air, cek
            <span className="hidden lg:inline">
              <br />
            </span>
            {" "}
            tagihan, dan lakukan pembayaran dalam satu sistem.

          </p>

          {/* ================= BUTTON ================= */}
          <div className="mt-8 flex justify-center">

            <button
              className="
                w-[158px]
                h-[45px]

                rounded-[34px]

                text-white
                text-[15px]
                lg:text-[16px]

                font-medium
                border
                transition

                hover:scale-[1.02]
                active:scale-[0.98]
              "
              style={{
                background: `
                  radial-gradient(
                    circle at top,
                    rgba(255,255,255,0.28) 0%,
                    rgba(255,255,255,0) 55%
                  ),
                  linear-gradient(
                    180deg,
                    #4DA2FF 0%,
                    #2173FF 100%
                  )
                `,
                border: "1px solid rgba(255,255,255,0.35)",
                boxShadow: `
                  0 10px 24px rgba(33,115,255,0.28),
                  inset 0 1px 0 rgba(255,255,255,0.45)
                `,
              }}
            >

              Coba sekarang

            </button>

          </div>

        </div>

        {/* ================= HERO IMAGE ================= */}
        <div className="relative mt-[36px] lg:mt-[40px] flex justify-center">

          <img
            src={HeroImage}
            alt="Aquora Dashboard Preview"
            className="
              w-full
              max-w-[1181px]
              h-auto
              object-contain
            "
          />

        </div>

      </div>

      {/* ================= SUPPORTED BY ================= */}
      <div className="relative z-10 bg-white pt-[55px] lg:pt-[84px] pb-[60px] lg:pb-[80px]">

        <p className="text-center text-[14px] lg:text-[16px] text-[#94A3B8] mb-7 lg:mb-8">
          Supported by
        </p>

        <div
          className="
            flex
            items-center
            justify-center
            gap-[34px]
            lg:gap-[70px]
            flex-wrap
          "
        >

          <img
            src={Telkom}
            alt="Telkom"
            className="
              h-[34px]
              lg:h-[56px]

              object-contain
              opacity-50
              grayscale
            "
          />

          <img
            src={Brin}
            alt="BRIN"
            className="
              h-[34px]
              lg:h-[56px]

              object-contain
              opacity-50
              grayscale
            "
          />

          <img
            src={Rekayasa}
            alt="Rekayasa"
            className="
              h-[34px]
              lg:h-[56px]

              object-contain
              opacity-50
              grayscale
            "
          />

        </div>

      </div>

    </section>
  )
}