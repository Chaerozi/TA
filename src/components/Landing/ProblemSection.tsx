import Sulit from "../../assets/Landing/Sulit.svg"
import Tagihan from "../../assets/Landing/Tagihan.svg"
import TidakAda from "../../assets/Landing/TidakAda.svg"

export default function ProblemSection() {
  return (
    <section
      id="about"
      className="w-full bg-white pt-[70px] pb-[90px]"
    >

      <div className="max-w-[1280px] mx-auto px-5 lg:px-4">

        {/* ================= TOP TEXT ================= */}
        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-start
            lg:justify-between

            gap-5
            lg:gap-6
          "
        >

          {/* LEFT */}
          <h2
            className="
              text-[28px]
              lg:text-[32px]

              leading-[135%]
              lg:leading-[120%]

              font-semibold
              text-[#0F172A]

              max-w-full
              lg:max-w-[520px]

              tracking-[-1px]

              text-center
              lg:text-left
            "
          >

            Masih Sulit Memantau
            <br />
            Penggunaan Air?

          </h2>

          {/* RIGHT */}
          <p
            className="
              text-[16px]
              lg:text-[20px]

              leading-[180%]
              lg:leading-[175%]

              text-[#94A3B8]

              max-w-full
              lg:max-w-[520px]

              pt-0
              lg:pt-2

              text-center
              lg:text-left
            "
          >

            Pantau penggunaan air, cek tagihan, dan deteksi anomali
            dalam satu dashboard terintegrasi.

          </p>

        </div>

        {/* ================= CARD LIST ================= */}
        <div
          className="
            mt-[36px]
            lg:mt-[42px]

            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3

            gap-4
          "
        >

          {/* ================= CARD 1 ================= */}
          <div
            className="
              w-full

              min-h-[130px]
              lg:h-[139px]

              rounded-[16px]
              border border-[#E5E7EB]
              bg-white

              px-[20px]
              lg:px-[24px]

              py-[22px]
              lg:py-0

              flex
              items-start
              lg:items-center

              gap-4
              lg:gap-5
            "
          >

            <img
              src={Tagihan}
              className="
                w-[48px]
                h-[48px]

                lg:w-[54px]
                lg:h-[54px]

                object-contain
                shrink-0
              "
            />

            <div>

              <h3
                className="
                  text-[18px]
                  lg:text-[20px]

                  leading-[135%]
                  lg:leading-[130%]

                  font-semibold
                  text-[#0F172A]
                "
              >

                Tagihan Kurang Transparan

              </h3>

              <p
                className="
                  mt-2

                  text-[14px]

                  leading-[170%]
                  lg:leading-[165%]

                  text-[#94A3B8]

                  max-w-full
                  lg:max-w-[270px]
                "
              >

                Sulit mengetahui apakah penggunaan air
                sesuai dengan tagihan yang diterima.

              </p>

            </div>

          </div>

          {/* ================= CARD 2 ================= */}
          <div
            className="
              w-full

              min-h-[130px]
              lg:h-[139px]

              rounded-[16px]
              border border-[#E5E7EB]
              bg-white

              px-[20px]
              lg:px-[24px]

              py-[22px]
              lg:py-0

              flex
              items-start
              lg:items-center

              gap-4
              lg:gap-5
            "
          >

            <img
              src={TidakAda}
              className="
                w-[48px]
                h-[48px]

                lg:w-[54px]
                lg:h-[54px]

                object-contain
                shrink-0
              "
            />

            <div>

              <h3
                className="
                  text-[18px]
                  lg:text-[20px]

                  leading-[135%]
                  lg:leading-[130%]

                  font-semibold
                  text-[#0F172A]
                "
              >

                Tidak Ada Monitoring Real-Time

              </h3>

              <p
                className="
                  mt-2

                  text-[14px]

                  leading-[170%]
                  lg:leading-[165%]

                  text-[#94A3B8]

                  max-w-full
                  lg:max-w-[290px]
                "
              >

                Pengguna hanya mengetahui pemakaian air
                saat tagihan bulanan keluar.

              </p>

            </div>

          </div>

          {/* ================= CARD 3 ================= */}
          <div
            className="
              w-full

              min-h-[130px]
              lg:h-[139px]

              rounded-[16px]
              border border-[#E5E7EB]
              bg-white

              px-[20px]
              lg:px-[24px]

              py-[22px]
              lg:py-0

              flex
              items-start
              lg:items-center

              gap-4
              lg:gap-5
            "
          >

            <img
              src={Sulit}
              className="
                w-[48px]
                h-[48px]

                lg:w-[54px]
                lg:h-[54px]

                object-contain
                shrink-0
              "
            />

            <div>

              <h3
                className="
                  text-[18px]
                  lg:text-[20px]

                  leading-[135%]
                  lg:leading-[130%]

                  font-semibold
                  text-[#0F172A]
                "
              >

                Sulit Mendeteksi Kebocoran

              </h3>

              <p
                className="
                  mt-2

                  text-[14px]

                  leading-[170%]
                  lg:leading-[165%]

                  text-[#94A3B8]

                  max-w-full
                  lg:max-w-[285px]
                "
              >

                Tidak ada notifikasi saat terjadi lonjakan
                penggunaan air yang tidak normal.

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}