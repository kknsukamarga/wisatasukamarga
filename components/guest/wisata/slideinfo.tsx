import { Bookmark } from "lucide-react";
import { CurrentSlide, DataShowcase } from "./showcase";
import { motion } from "framer-motion";
import OtherInfo from "./other-info";

interface SlideInfoProps {
  transitionData: DataShowcase;
  currentSlide: CurrentSlide;
}

function SlideInfo({ transitionData, currentSlide }: SlideInfoProps) {
  return (
    <>
      <OtherInfo data={transitionData ? transitionData : currentSlide.data} />

      <motion.span layout className="mb-2 h-1 w-5 rounded-full bg-white">
        <motion.div layout className="mt-5 flex items-center gap-3">
          <button className="flex h-[41px] w-[41px] items-center justify-center rounded-full hover:opacity-85 transition duration-200 ease-in-out">
            <Bookmark />
          </button>

          <button className="w-fit rounded-full border-[1px] border-white px-6 py-3 text-[10px] font-thin transition ease-in-out hover:bg-white hover:text-black">
            Discover Location
          </button>
        </motion.div>
      </motion.span>
    </>
  );
}

export default SlideInfo;
