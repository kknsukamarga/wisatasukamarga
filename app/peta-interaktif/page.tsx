"use client";
import { useState } from "react";
import Footer from "@/components/guest/footer";
import Navbar from "@/components/guest/navbar";
import peta from "@/public/peta/map.png";
import header from "@/public/wisata/jelajahheader.png";

export default function Page() {
  const [modalData, setModalData] = useState({
    isOpen: false,
    title: "",
    img: "",
  });

  const data = [
    {
      title: "Keramikan",
      description: "Area Keramikan terkenal dengan keindahan alamnya yang memukau.",
      img: "https://placehold.co/600x400"
    },
    {
      title: "Danau Minyak",
      description: "Danau Minyak memiliki pemandangan yang eksotis dan menarik.",
      img: "https://placehold.co/600x400"
    },
    {
      title: "Danau Lebar",
      description: "Danau Lebar adalah danau terbesar di kawasan ini.",
      img: "https://placehold.co/600x400"
    },
    {
      title: "Air Terjun",
      description: "Air Terjun ini menjadi daya tarik wisata utama di daerah ini.",
      img: "https://placehold.co/600x400"
    },
    {
      title: "Balai Pekon",
      description: "Balai Pekon adalah tempat pertemuan dan acara budaya.",
      img: "https://placehold.co/600x400"
    },
    {
      title: "Kawah Keramikan",
      description: "Kawah Keramikan memiliki aktivitas vulkanik yang menarik.",
      img: "https://placehold.co/600x400"
    },
    {
      title: "Pasir Kuning Suoh",
      description: "Pasir Kuning Suoh terkenal karena pasir kuning yang unik.",
      img: "https://placehold.co/600x400"
    },
    {
      title: "Danau Asam",
      description: "Danau Asam memiliki air yang bersifat asam dan pemandangan indah.",
      img: "https://placehold.co/600x400"
    },
    {
      title: "Kawah Merah",
      description: "Kawah Merah adalah kawah dengan warna merah yang unik.",
      img: "https://placehold.co/600x400"
    },
  ];
  

  const openModal = (title) => {
    const selectedData = data.find((item) => item.title === title);
    if (selectedData) {
      setModalData({ isOpen: true, ...selectedData });
    } else {
      console.error("No data found for the given title:", title);
    }
  };

  const closeModal = () => {
    setModalData({ isOpen: false, title: "", img: "" });
  };

  return (
    <main className="bg-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center rounded-xl">
        <div className="my-6 text-center">
          <h1 className="text-3xl font-black">Telusur Wisata</h1>
          <p>Klik salah satu tempat dibawah ini</p>
        </div>
        <div className="overflow-x-auto md:w-full md:flex md:flex-col md:items-center md:justify-center w-screen">
        <svg
          width="1441"
          height="811"
          viewBox="0 0 1441 811"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          
          <image width="1441" height="811" href={peta.src}></image>

          <rect
            opacity="0.2"
            x="574.134"
            y="21.4624"
            width="147.305"
            height="111.445"
            rx="55.7227"
            fill="#D9D9D9"
            fillOpacity="0.13"
            onClick={() => openModal("Keramikan")}
          />
          <rect
            opacity="0.2"
            x="620.55"
            y="225.095"
            width="100.319"
            height="82.3516"
            rx="41.1758"
            fill="#D9D9D9"
            fillOpacity="0.13"
            onClick={() => openModal("Danau Minyak")}
          />
          <rect
            opacity="0.2"
            x="607.074"
            y="425.734"
            width="303.952"
            height="306.947"
            rx="130.254"
            fill="#D9D9D9"
            fillOpacity="0.13"
            onClick={() => openModal("Danau Lebar")}
          />
          <rect
            opacity="0.2"
            x="12.645"
            y="612.897"
            width="185.666"
            height="151.228"
            rx="75.6138"
            fill="#D9D9D9"
            fillOpacity="0.13"
            onClick={() => openModal("Air Terjun")}
          />
          <rect
            opacity="0.2"
            x="527.717"
            y="307.447"
            width="133.26"
            height="107.806"
            rx="53.9029"
            fill="#D9D9D9"
            fillOpacity="0.13"
            onClick={() => openModal("Balai Pekon")}
          />
          <rect
            opacity="0.2"
            x="671.799"
            y="112.999"
            width="147.305"
            height="111.445"
            rx="55.7227"
            fill="#D9D9D9"
            fillOpacity="0.13"
            onClick={() => openModal("Kawah Keramikan")}
          />
          <rect
            opacity="0.2"
            x="819.286"
            y="90.3384"
            width="147.305"
            height="111.445"
            rx="55.7227"
            fill="#D9D9D9"
            fillOpacity="0.13"
            onClick={() => openModal("Pasir Kuning Suoh")}
          />
          <rect
            opacity="0.2"
            x="952.546"
            y="58.895"
            width="232.082"
            height="250.05"
            rx="116.041"
            fill="#D9D9D9"
            fillOpacity="0.13"
            onClick={() => openModal("Danau Asam")}
          />
          <rect
            opacity="0.2"
            x="725.361"
            y="229.587"
            width="67.3786"
            height="50.9083"
            rx="22.4595"
            fill="#D9D9D9"
            fillOpacity="0.13"
            onClick={() => openModal("Kawah Merah")}
          />
        </svg>
        </div>
      </div>

      {/* Modal */}
      {modalData.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-xl">
            <img src={modalData.img} />
            <h2 className="text-lg font-bold my-4">{modalData.title}</h2>
            <p className="text-gray-700">
              Informasi tentang {modalData.title} akan ditampilkan di sini.
            </p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={closeModal}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
}
