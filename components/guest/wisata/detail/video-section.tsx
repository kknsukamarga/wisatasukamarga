const dataVideoWisata = [
  {
    nama: "danau-asam",
    src: "https://www.youtube.com/embed/Fxwxw752QvY?si=3DYqnoXaxd-rKAu0",
  },
  {
    nama: "danau-lebar",
    src: "https://www.youtube.com/embed/gwGX0rz_A0I?si=Bvtyl5mu0hNlSCv6",
  },
  {
    nama: "danau-minyak",
    src: "https://www.youtube.com/embed/zRRuhPnXASY?si=NORwaMK8-_833Ty6",
  },
  {
    nama: "kawah-keramikan",
    src: "https://www.youtube.com/embed/oYwHSlzLxIk?si=9VOQzcT79xlvpCBG",
  },
  {
    nama: "kawah-merah",
    src: "https://www.youtube.com/embed/hrVvTOhAzlo?si=S-aElKQNXjshLVUw",
  },
  {
    nama: "pasir-kuning",
    src: "https://www.youtube.com/embed/EoaSJbhB7xI?si=jsK1oPGnqkNh81P5",
  },
  {
    nama: "kawah-nirwana",
    src: "https://www.youtube.com/embed/975jT3xSl2g?si=ZegwAPJ0XHsUaKUC",
  },
];

export default function VideoSection({ namaWisata }: { namaWisata: string }) {
  return (
    <div className="px-2 mt-10">
      <div className="rounded-lg overflow-hidden shadow-lg max-w-2xl mx-auto">
        <iframe
          className="video min-h-[200px] md:min-h-[400px]"
          src={dataVideoWisata.find((video) => video.nama === namaWisata)?.src}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
