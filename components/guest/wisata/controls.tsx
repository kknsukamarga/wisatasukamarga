import { ArrowLeft, ArrowRight } from "lucide-react";
import { CurrentSlide, DataShowcase } from "./showcase";
import Progress from "./progress";

interface ControlsProps {
  currentSlideData: CurrentSlide;
  sliderData: DataShowcase[];
  data: DataShowcase[];
  transitionData: DataShowcase;
  handleData: React.Dispatch<React.SetStateAction<DataShowcase[]>>;
  handleTransitionData: React.Dispatch<React.SetStateAction<DataShowcase>>;
  handleCurrentSlideData: React.Dispatch<React.SetStateAction<CurrentSlide>>;
  initData: DataShowcase;
}

function Controls({
  currentSlideData,
  sliderData,
  data,
  transitionData,
  handleData,
  handleTransitionData,
  handleCurrentSlideData,
  initData,
}: ControlsProps) {
  const handlePrev = () => {
    handleData((prevData) => [
      transitionData ? transitionData : initData,
      ...prevData.slice(0, prevData.length - 1),
    ]);
    handleCurrentSlideData({
      data: transitionData ? transitionData : sliderData[0],
      index: sliderData.findIndex(
        (ele) => ele.img === data[data.length - 1].img
      ),
    });
    handleTransitionData(data[data.length - 1]);
  };

  const handleNext = () => {
    handleData((prev) => prev.slice(1));
    handleCurrentSlideData({
      data: transitionData ? transitionData : initData,
      index: sliderData.findIndex((ele) => ele.img === data[0].img),
    });
    handleTransitionData(data[0]);
    setTimeout(() => {
      handleData((newData) => [
        ...newData,
        transitionData ? transitionData : initData,
      ]);
    });
  };
  return (
    <div className="flex items-center gap-3 px-0 py-3 md:px-1 md:py-5">
      <SliderButton handleClick={handlePrev}>
        <ArrowLeft />
      </SliderButton>

      <SliderButton handleClick={handleNext}>
        <ArrowRight />
      </SliderButton>

      <Progress currIndex={currentSlideData.index} length={sliderData.length} />
    </div>
  );
}

export default Controls;

const SliderButton = ({
  children,
  handleClick,
}: {
  children: React.ReactNode;
  handleClick: () => void;
}) => {
  return (
    <button
      className="flex h-14 w-14 items-center justify-center rounded-full border-[1px] border-black/20 transform ease-in-out hover:bg-white hover:text-black"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
