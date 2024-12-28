import { memo, useEffect } from "react";
import { Button } from "./ui/button";

interface IProps {
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  data: { count: number; pageSize: number } | undefined;
}

function Pagination({ pageIndex, setPageIndex, data }: IProps) {
  const totalCount = data ? Math.ceil(data.count / data.pageSize) : 0;

  const prevHandler = () => setPageIndex((prev) => prev - 1);
  const nextHandler = () => setPageIndex((prev) => prev + 1);

  useEffect(() => {
    sessionStorage.setItem("pageIndex", pageIndex.toString());
  }, [pageIndex]);

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
