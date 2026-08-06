import { Button } from "./Button";

import previousSvg from "../assets/left.svg";
import nextSvg from "../assets/right.svg";
import { merge } from "../utils/classMerge";

type Props = {
  current: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
};

export function Pagination({ current, totalPages, onNext, onPrevious }: Props) {
  return (
    <div className="flex justify-center items-center gap-4">
      <Button
        variant="iconSmall"
        onClick={onPrevious}
        disabled={current === 1}
        className={merge(current === 1 && "disabled:cursor-not-allowed")}
      >
        <img src={previousSvg} alt="" />
      </Button>
      <span className="text-sm text-gray-200">
        {current} / {totalPages}
      </span>
      <Button
        variant="iconSmall"
        disabled={current === totalPages}
        className={merge(
          current === totalPages && "disabled:cursor-not-allowed",
        )}
        onClick={onNext}
      >
        <img src={nextSvg} alt="" />
      </Button>
    </div>
  );
}
