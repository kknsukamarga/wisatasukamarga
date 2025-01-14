import { motion } from "framer-motion";

interface ProgressProps {
  currIndex: number;
  length: number;
}

function Progress({ currIndex, length }: ProgressProps) {
  return (
    <>
      <div className="flex h-[1px] flex-1 items-center rounded-full bg-white bg-opacity-50">
        <div
          style={{
            width: ((currIndex / length) * 100).toString() + "%", // Perhitungan yang benar
          }}
          className={`h-[1px] rounded-full bg-yellow-400 bg-opacity-50`}
        ></div>
      </div>

      <span
        key={currIndex}
        style={{
          overflow: "hidden",
          display: "inline-block",
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          key={currIndex}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="flex items-center text-4xl font-medium"
        >
          0{currIndex + 1}
        </motion.div>
      </span>
    </>
  );
}

export default Progress;
