import { CurrentSlide, DataShowcase } from "./showcase";
import { motion } from "framer-motion";
import OtherInfo from "./other-info";
import Link from "next/link";

interface SlideInfoProps {
  transitionData: DataShowcase;
  currentSlide: CurrentSlide;
}

function SlideInfo({ transitionData, currentSlide }: SlideInfoProps) {
  return (
    <>
      <OtherInfo data={transitionData ? transitionData : currentSlide.data} />

      <motion.span layout className="mb-2 h-1 w-8 rounded-full bg-white mt-4">
        <motion.div layout className="mt-5 flex items-center gap-3">
          <button className="flex h-[41px] w-[41px] items-center justify-center rounded-full hover:opacity-85 transition duration-200 ease-in-out">
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
              className="icon icon-tabler icons-tabler-outline icon-tabler-share"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M8.7 10.7l6.6 -3.4" />
              <path d="M8.7 13.3l6.6 3.4" />
            </svg>
          </button>

          <Link
            href={`/wisata/${transitionData.slug}`}
            className="min-w-[200px] lg:min-w-[300px] rounded-full border-[1px] border-white py-2 text-[10px] font-thin transition ease-in-out hover:bg-white hover:text-black flex items-center justify-center"
          >
            Lihat Detail
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
              className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l14 0" />
              <path d="M15 16l4 -4" />
              <path d="M15 8l4 4" />
            </svg>
          </Link>
        </motion.div>
      </motion.span>
    </>
  );
}

export default SlideInfo;
