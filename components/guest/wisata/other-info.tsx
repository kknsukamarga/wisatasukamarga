import { TangoSans } from "@/app/fonts";
import { motion } from "framer-motion";
import Link from "next/link";

interface OtherInfoProps {
  data: any;
}

const items = {
  hidden: {
    y: "100%",
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
  },
  visible: {
    y: 0,
    transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
  },
};

function OtherInfo({ data }: OtherInfoProps) {
  return (
    <motion.div initial="hidden" animate={"visible"} className="flex flex-col">
      <motion.div variants={items}>
        <Link
          href={data?.location}
          className="flex items-center gap-2 border rounded-full pt-1 pb-2 w-fit px-4"
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-map-pin"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
            <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
          </svg>
          Kunjungi Lokasi
        </Link>
      </motion.div>

      <AnimatedText
        data={data?.title}
        className={`my-1 text-4xl font-semibold md:my-3 md:text-6xl md:leading-[70px] xl:text-8xl xl:leading-[100px] ${TangoSans.className}`}
      />

      <AnimatedText
        data={data?.description}
        className="text-xs text-white line-clamp-3"
      />
    </motion.div>
  );
}

export default OtherInfo;

function AnimatedText({
  data,
  className,
}: {
  data?: string;
  className?: string;
}) {
  return (
    <span style={{ display: "inline-block", overflow: "hidden" }}>
      <motion.p className={`${className}`} variants={items} key={data}>
        {data}
      </motion.p>
    </span>
  );
}
