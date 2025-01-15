import ErrorMessage from "@/components/ErrorMessage";
import Input from "@/components/Input";
import PageTitle from "@/components/PageTitle";
import Pagination from "@/components/Pagination";
import Spinner from "@/components/Spinner";
import Table from "@/components/Table";
import useCustomQuery from "@/hooks/use-cutstom-query";
import { IOrder, IQuery } from "@/interfaces";
import { getStatusColor, tableSearch } from "@/utils/functions";
import { format } from "date-fns";
import { RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function DashboardOrders() {
  const INDEX = Number(sessionStorage.getItem("ordersIndex") || 1);

  const PAGE_SIZE = 10;
  const [pageIndex, setPageIndex] = useState(INDEX);

  const { data, error, isFetching, refetch } = useCustomQuery<IQuery<IOrder>>({
    key: ["getOrders", `${pageIndex}`],
    url: `/orders?pageIndex=${pageIndex}&pageSize=${PAGE_SIZE}`,
  });

  const tableHeaders = useMemo(
    () => ["name", "email", "address", "total amount", "created at", "status"],
    []
  );

  useEffect(() => {
    sessionStorage.setItem("ordersIndex", pageIndex.toString());
  }, [pageIndex]);

  // ** Render **
  const renderOrders = data?.data.map((order, idx: number) => (
    <tr key={order.id}>
      <td>{idx + 1}</td>
      <td className=" capitalize">
        {order.firstName + " " + order.secondName}
      </td>
      <td>{order.email}</td>
      <td>{order.address || "-"} </td>
      <td>${order.totalAmount} </td>
      <td>{format(order.createdAt, "dd MMM yyyy - hh:mm a")}</td>
      <td>
        <span
          className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
            order.status
          )}`}
        >
          {order.status}
        </span>
      </td>
    </tr>
  ));

  return (
    <div>
      <PageTitle>
        <h2 className="text-lg sm:text-2xl">Orders</h2>
        <RefreshCw
          size={25}
          className={`cursor-pointer hover:text-primary transition-all duration-500 ease-linear ${
            isFetching ? "animate-spin pointer-events-none opacity-50" : ""
          }`}
          onClick={() => refetch()}
        />
      </PageTitle>

      <div className="mt-2 p-4 rounded-lg bg-background">
        <Input
          type="search"
          placeholder="Search here ..."
          className="w-full mb-4"
          data-aos="fade-up"
          onChange={tableSearch}
        />

        {!isFetching ? (
          <>
            <Table
              className="!min-w-[900px] [&>tbody>tr>td]:!py-5"
              headers={tableHeaders}
            >
              {renderOrders}
            </Table>
            <Pagination {...{ data, pageIndex, setPageIndex }} />
          </>
        ) : (
          <Spinner />
        )}
        {error && <ErrorMessage message="Something went wrong" />}
      </div>
    </div>
  );
}

export default DashboardOrders;