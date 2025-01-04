import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">404</h1>

        <span className="font-medium">Oops! Halaman Tidak Ditemukan!</span>

        <p className="text-center text-muted-foreground">
          Sepertinya halaman yang Anda cari <br />
          tidak ada atau mungkin telah dihapus.
        </p>

        <div className="mt-6 flex gap-4">
          <Link href="/">Kembali ke Beranda</Link>
        </div>
      </div>
    </div>
  );
}
