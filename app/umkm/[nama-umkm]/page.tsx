"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/guest/footer";
import Navbar from "@/components/guest/navbar";
import Hero from "@/components/guest/umkm/hero";

export default function ProductDetail({ params }: { params: { "nama-umkm": string } }) {
    const router = useRouter();

    const data = [...Array(25)].map((_, index) => ({
        id: index + 1,
        name: `produk-umkm-${index + 1}`, // Format slug-friendly untuk nama produk
        description: "Jual kopi-kopian dengan cita rasa khas yang menggugah...",
        price: `Rp${(index + 1) * 10}.000,00`,
        image: "https://placehold.co/300x200",
    }));

    const itemsPerPage = 4; // Items per page
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedData = data.slice(startIndex, endIndex);

    const handleProductClick = (name: string) => {
        router.push(`/umkm/${name}`); // Navigasi ke halaman detail produk
    };

    // State untuk menyimpan gambar yang sedang dipilih
    const [selectedImage, setSelectedImage] = useState("https://placehold.co/600x400");

    // Daftar gambar
    const images = ["https://placehold.co/600x400", "https://placehold.co/100x100?text=Image1", "https://placehold.co/100x100?text=Image2", "https://placehold.co/100x100?text=Image3", "https://placehold.co/100x100?text=Image4"];

    return (
        <main className="bg-[#e5e0d5]">
            <Navbar isLoggedIn={true} />
            <Hero />

            <div className="container mx-auto p-4">
                {/* Detail Produk */}
                <div className="p-4 bg-gray-200 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">
                        <span className="text-blue-500 cursor-pointer" onClick={() => router.push("/umkm")}>
                            UMKM
                        </span>{" "}
                        &gt; {params["nama-umkm"]}
                    </div>

                    <div className="flex flex-col lg:flex-row">
                        <div className="flex-1">
                            {/* Gambar utama yang ditampilkan */}
                            <img src={selectedImage} alt="Selected product" className="rounded-lg w-full" />
                            <div className="flex mt-4 space-x-2">
                                {/* Pilihan gambar */}
                                {images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        className={`w-20 h-20 rounded-lg cursor-pointer ${selectedImage === image ? "border-4 border-green-700" : ""}`}
                                        onClick={() => setSelectedImage(image)} // Mengubah gambar yang ditampilkan
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex-1 lg:ml-8 mt-4 lg:mt-0">
                            <h1 className="text-2xl font-bold">{params["nama-umkm"]}</h1>
                            <div className="text-3xl font-bold text-green-700 mt-2">Rp500.000</div>
                            <p className="mt-4 text-gray-700">
                                Kopi Lampung Suoh adalah salah satu produk unggulan dari daerah Suoh, Lampung Barat, yang dikenal dengan cita rasa khas dan aroma yang kuat. Tumbuh di dataran tinggi dengan tanah vulkanik yang subur, kopi ini
                                memiliki karakteristik rasa yang unik, perpaduan antara keasaman lembut dan kekayaan rasa cokelat yang menggoda.
                            </p>
                            <button className="beli-produk-btn">
                                <a
                                    href="https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20membeli%20produk%20Kopi%20Lampung%20Suoh.%20Bisa%20berikan%20informasi%20lebih%20lanjut?"
                                    target="_blank" 
                                >
                                    Beli Produk
                                </a>
                            </button>

                            <div className="mt-4 flex flex-col space-y-4">
                                <span className="font-semibold text-gray-700">Bagikan Produk</span>
                                <div className="flex gap-4">
                                    <a href="https://www.instagram.com/kknsukamarga/" target="_blank" rel="noopener noreferrer" className="text-basic p-2 bg-green-700 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.362 3.608 1.337.975.975 1.275 2.242 1.337 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.362 2.633-1.337 3.608-.975.975-2.242 1.275-3.608 1.337-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.362-3.608-1.337-.975-.975-1.275-2.242-1.337-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.362-2.633 1.337-3.608.975-.975 2.242-1.275 3.608-1.337 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.259 0-3.67.013-4.947.072-1.552.071-2.91.388-3.996 1.474s-1.403 2.444-1.474 3.996c-.059 1.277-.072 1.688-.072 4.947s.013 3.67.072 4.947c.071 1.552.388 2.91 1.474 3.996s2.444 1.403 3.996 1.474c1.277.059 1.688.072 4.947.072s3.67-.013 4.947-.072c1.552-.071 2.91-.388 3.996-1.474s1.403-2.444 1.474-3.996c.059-1.277.072-1.688.072-4.947s-.013-3.67-.072-4.947c-.071-1.552-.388-2.91-1.474-3.996s-2.444-1.403-3.996-1.474c-1.277-.059-1.688-.072-4.947-.072z" />
                                            <circle cx="12" cy="12" r="3.5" />
                                            <circle cx="17.5" cy="6.5" r="1.5" />
                                        </svg>
                                    </a>
                                    <a href="https://www.tiktok.com/@kkn.sukamarga" target="_blank" rel="noopener noreferrer" className="text-basic p-2 bg-green-700 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M21 7.917v4.034a9.948 9.948 0 0 1-5-1.951v4.5a6.5 6.5 0 1 1-8-6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" />
                                        </svg>
                                    </a>
                                    <a href="https://suka-marga.desa.id/pages/home/home.aspx" target="_blank" rel="noopener noreferrer" className="text-basic p-2 bg-green-700 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19.5 7a9 9 0 0 0-7.5-4 8.991 8.991 0 0 0-7.484 4" />
                                            <path d="M11.5 3a16.989 16.989 0 0 0-1.826 4" />
                                            <path d="M12.5 3a16.989 16.989 0 0 1 1.828 4" />
                                            <path d="M19.5 17a9 9 0 0 1-7.5 4 8.991 8.991 0 0 1-7.484-4" />
                                        </svg>
                                    </a>
                                    <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer" className="text-basic p-2 bg-green-700 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456..." />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Produk Lainnya */}

                <div className="bg-orange-500 p-4 mt-8 rounded-lg">
                    <h2 className="text-xl font-bold text-basic mb-4">Lihat Produk Lainnya...</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {displayedData.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                                <img src={item.image} alt={item.name} className="rounded-t-lg mb-4" />
                                <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                                <p className="text-gray-600 mb-4">{item.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold">{item.price}</span>
                                    <button
                                        className="icon-btn"
                                        onClick={() => handleProductClick(item.name)} // Tambahkan handler klik
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
