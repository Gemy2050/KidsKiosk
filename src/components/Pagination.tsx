import { memo } from "react";
import { Button } from "./ui/button";

interface IProps {
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  data: { count: number; pageSize: number } | undefined;
  scrollToTop?: () => void;
}

function Pagination({ pageIndex, setPageIndex, data, scrollToTop }: IProps) {
  const totalCount = data ? Math.ceil(data.count / data.pageSize) : 0;

  const prevHandler = () => {
    setPageIndex((prev) => prev - 1);
    if (scrollToTop) scrollToTop();
  };
  const nextHandler = () => {
    setPageIndex((prev) => prev + 1);
    if (scrollToTop) scrollToTop();
  };

  if (!data) return null;
  return (
    <div className="flex justify-between items-center ">
      <Button onClick={prevHandler} disabled={pageIndex == 1}>
        Prev
      </Button>
      <span>
        {pageIndex} of {totalCount}
      </span>

      <Button
        onClick={nextHandler}
        disabled={data ? pageIndex == totalCount : true}
      >
        Next
      </Button>
    </div>
  );
}

export default memo(Pagination);
