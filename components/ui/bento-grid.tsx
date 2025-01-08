import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  author,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  author?: string;
}) => {
  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden p-3 flex flex-col justify-between bg-white dark:bg-black  dark:border-neutral-700 hover:shadow-xl transition duration-200 shadow-input dark:shadow-none dark:border-white/[0.2] border-transparent space-y-1 border border-[#7E7E7E] cursor-pointer",
        className
      )}
    >
      <div className="relative w-full h-48 mb-4">{header}</div>

      <Badge
        variant="default"
        className="w-fit bg-orange-secondary/65 -ml-1 text-gray rounded-full hover:bg-orange-secondary/65 hover:text-gray"
      >
        {"Badge".toUpperCase()}
      </Badge>

      <div className="flex flex-col items-start gap-2 mt-1">
        {/* {icon} */}
        <p className="text-sm opacity-50">Rabu, 19 Agustus 2022</p>

        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
          {title}
        </h3>
      </div>

      <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
        {description}
      </p>
    </div>
  );
};
