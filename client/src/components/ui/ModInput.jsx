import { IconButton } from "../elements";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
export default function ModInput(props) {
  return (
    <div className="max-w-xl mx-auto w-full">
      <div className="relative flex w-full border-primary border-2 rounded-sm">
        <input
          {...props}
          className="pr-20 font-[400] p-2.5 placeholder:font-siliguri text-sm text-gray-800 w-full border-none focus:outline-0"
        />
        <IconButton
          size="sm"
          className="!absolute right-1 top-1 rounded-full bg-primary"
        >
          <MagnifyingGlassIcon strokeWidth={2} width={20} />
        </IconButton>
      </div>
    </div>
  );
}
