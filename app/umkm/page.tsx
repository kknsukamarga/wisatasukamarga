"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Tambahkan import useRouter
import Footer from "@/components/guest/footer";
import Navbar from "@/components/guest/navbar";
import Hero from "@/components/guest/umkm/hero";

export default function UMKMPage({ isLoggedIn }: { isLoggedIn: boolean }) {
    const router = useRouter(); // Inisialisasi useRouter

    const data = [...Array(25)].map((_, index) => ({
        id: index + 1,
        name: `produk-umkm-${index + 1}`, // Format slug-friendly untuk nama produk
        description: "Jual kopi-kopian dengan cita rasa khas yang menggugah...",
        price: `Rp${(index + 1) * 10}.000,00`,
        image: "https://placehold.co/300x200",
    }));

    const itemsPerPage = 8; // Items per page
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedData = data.slice(startIndex, endIndex);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleProductClick = (name: string) => {
        router.push(`/umkm/${name}`); // Navigasi ke halaman detail produk
    };

    return (
        <main className="bg-[#e5e0d5]">
            <Navbar isLoggedIn={isLoggedIn} />
            <Hero />

            <div className="container mx-auto p-4">
                {/* Header Section */}
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">UMKM Suka Marga</h1>
                    <p className="text-lg">Untuk mendapatkan informasi yang lebih lengkap, mendalam, dan menarik seputar topik ini, jangan ragu untuk membaca seluruh artikel yang telah kami sajikan secara detail di sini!</p>
                </header>

                {/* Product Cards */}
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

                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-6">
                    <button onClick={handlePrev} disabled={currentPage === 1} className={`px-4 py-2 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}>
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button onClick={handleNext} disabled={currentPage === totalPages} className={`px-4 py-2 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}>
                        Next
                    </button>
                </div>
            </div>

            <Footer />
        </main>
    );
}
