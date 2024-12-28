import {
  Questa,
  TangoSansBold,
  TangoSans,
  TangoSansBoldItalic,
  TangoSansItalic,
} from "@/app/fonts";

function Hero() {
  return (
    <div
      className={`${Questa.className} min-h-screen flex flex-col items-center justify-center`}
      id="hero"
    >
      <p className="text-7xl font-bold">DESA MARGA AGUNG</p>

      <p className={`${TangoSans.className} text-7xl`}>HERO TANGO SANS</p>

      <p className={`${TangoSansItalic.className} text-7xl`}>
        HERO TANGO SANS ITALIC
      </p>

      <p className={`${TangoSansBold.className} text-7xl`}>
        HERO TANGO SANS BOLD
      </p>

      <p className={`${TangoSansBoldItalic.className} text-7xl`}>
        HERO TANGO SANS BOLD ITALIC
      </p>
    </div>
  );
}

export default Hero;
