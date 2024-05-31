import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@/components/elements";

const ScrollToTop = () => {
  return (
    <div className="fixed md:block z-[10000] hidden bottom-5 right-5">
      <IconButton
        variant="outlined"
        size="sm"
        className="rounded-full border-2"
        onClick={() =>
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
        }
      >
        <ChevronUpIcon width={22} strokeWidth={2} />
      </IconButton>
    </div>
  );
};

export default ScrollToTop;
