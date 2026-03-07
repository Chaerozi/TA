import Peringatan from "../assets/beranda/Peringatan.svg";

export default function AlertUsage() {
  return (
    <div className="mt-4 bg-gradient-to-r from-[#FDE68A] to-[#FDBA74] rounded-[12px] px-4 py-3 flex gap-3 items-start shadow-[0_6px_20px_rgba(0,0,0,0.08)]">

      <img src={Peringatan} className="w-[24px]" />

      <p className="text-[12px] text-[#78350F] leading-snug">
        <span className="font-semibold">
          Pemakaian lebih tinggi dari biasanya.
        </span>
        <br />
        Periksa kemungkinan kebocoran atau kran terbuka.
      </p>

    </div>
  );
}