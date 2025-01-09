"use client";

import { TangoSansBold } from "@/app/fonts";
import Link from "next/link";
import { useState } from "react";

interface FooterDetailWisataProps {
  link?: string;
}

export default function FooterDetailWisata({ link }: FooterDetailWisataProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyLink = () => {
    const linkToCopy = link ? link : "https://wisatasukamarga.my.id";

    navigator.clipboard.writeText(linkToCopy).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset feedback after 2 seconds
    });
  };

  return (
    <div className="py-10">
      <div className="flex mx-auto justify-center items-center flex-col text-center w-fit">
        <div className="p-2 rounded-full w-fit bg-orange-primary z-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-share"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M8.7 10.7l6.6 -3.4" />
            <path d="M8.7 13.3l6.6 3.4" />
          </svg>
        </div>

        <h2
          className={`${TangoSansBold.className} mt-5 w-fit rounded-md text-2xl text-center`}
        >
          Share Wisata {`Tes`}
        </h2>

        <p className="md:w-[50%] w-[90%] mx-auto mt-2">
          Bagikan ke teman-temanmu agar mereka juga bisa menikmati keindahan
          alam di Sukamarga.
        </p>

        <div className="flex flex-col gap-4 mt-10 relative">
          <div className="flex gap-4 h-fit">
            <Link
              href="https://x.com/intent/post?text=Ayo+jalan+jalan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white p-2 bg-green rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
            </Link>
            <Link
              href="https://web.facebook.com/share_channel/?type=reshare&link=https://wisatasukamarga.my.id&app_id=966242223397117&source_surface=external_reshare&display&hashtag"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white p-2 bg-green rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
              </svg>
            </Link>
            <Link
              href="https://api.whatsapp.com/send/?text=Ayo+Jalan+Jalan+ke+Sukamarga+https://wisatasukamarga.my.id&type=custom_url&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white p-2 bg-green rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
                  fill="currentColor"
                />
              </svg>
            </Link>

            {/* Icon to copy link di page komponen ini dirender */}

            {copySuccess && (
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-sm px-3 py-1 rounded-md shadow-md">
                Link Disalin!
              </div>
            )}

            <button
              onClick={handleCopyLink}
              className="text-white p-2 bg-green rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 15l6 -6" />
                <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
                <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
