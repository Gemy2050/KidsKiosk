import Alert from "@/components/Alert";
import ErrorMessage from "@/components/ErrorMessage";
import IconButton from "@/components/IconButton";
import Input from "@/components/Input";
import LinkButton from "@/components/LinkButton";
import PageTitle from "@/components/PageTitle";
import Pagination from "@/components/Pagination";
import Spinner from "@/components/Spinner";
import { buttonVariants } from "@/components/ui/button";
import axiosInstance from "@/config/axios.config";
import useCustomQuery from "@/hooks/use-cutstom-query";
import { toast } from "@/hooks/use-toast";
import { IAxiosError, Product } from "@/interfaces";
import { tableSearch } from "@/utils/functions";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Image, PenBox, Trash } from "lucide-react";
import React, { lazy, Suspense, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const Table = lazy(() => import("@/components/Table"));

interface IQuery {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: Product[];
}

function Products() {
  const INDEX = sessionStorage.getItem("pageIndex")
    ? Number(sessionStorage.getItem("pageIndex"))
    : 1;

  const [disabled, setDisabled] = useState(false);
  const [pageIndex, setPageIndex] = useState(INDEX);
  const PAGE_SIZE = 5;

  const tableHeaders = useMemo(
    () => ["image", "name", "category", "price", "discount", "actions"],
    []
  );

  const QueryClient = useQueryClient();

  const { data, error } = useCustomQuery<IQuery>({
    key: ["getAllProducts", `${pageIndex}`],
    url: `/product/get-all-products?pageSize=${PAGE_SIZE}&pageIndex=${pageIndex}`,
  });

  const handleDeleteProduct = async (id: number | string) => {
    try {
      setDisabled(true);
      await axiosInstance.delete(`/product/delete-product?id=${id}`);
      toast({
        title: "Done",
        description: "Product deleted successfully",
        variant: "success",
      });

      if (data?.data.length === 1 && pageIndex > 1) {
        const newPageIndex = pageIndex - 1;

        setPageIndex(newPageIndex);
        QueryClient.invalidateQueries({
          queryKey: ["getAllProducts", `${newPageIndex}`],
        });
        return;
      }
      QueryClient.invalidateQueries({
        queryKey: ["getAllProducts", `${pageIndex}`],
      });
    } catch (err) {
      const error = err as AxiosError<IAxiosError>;
      toast({
        title: "something went wrong",
        description: error.response?.data.message,
        variant: "destructive",
      });
    } finally {
      setDisabled(false);
    }
  };

  // ** Render Products Rows ** //
  const renderProducts = data?.data?.map((product, idx: number) => (
    <tr key={product.id} className="text-center">
      <td>{idx + 1}</td>
      <td>
        <img
          src={product.imageUrl}
          alt="product image"
          className="w-[80px] h-[50px] mx-auto"
          loading="lazy"
        />
      </td>
      <td>{product.name}</td>
      <td>{product.productCategory}</td>
      <td>{product.price}</td>
      <td>{product.priceBeforeDiscount - product.price}</td>
      <td className="space-x-1 min-w-[115px]">
        <LinkButton
          className="p-1 bg-green-600 hover:bg-green-500 duration-200"
          to={`images/${product.id}`}
          size={"xs"}
          rounded={"md"}
        >
          <Image size={14} />
        </LinkButton>
        <LinkButton
          className="p-1"
          to={`edit/${product.id}`}
          size={"xs"}
          rounded={"md"}
        >
          <PenBox size={14} />
        </LinkButton>
        <Alert
          onDelete={() => handleDeleteProduct(product.id)}
          title={`Are you sure to delete this product "${product.name}"?`}
          description="you cannot retrieve this product after deleting it."
          disabled={disabled}
        >
          <IconButton className="p-1" variant="destructive">
            <Trash size={14} />
          </IconButton>
        </Alert>
      </td>
    </tr>
  ));

  return (
    <>
      <PageTitle>
        <h2 className="text-lg sm:text-2xl">Products</h2>
      </PageTitle>

      <div className=" mt-2 p-4 rounded-lg bg-background">
        <Link
          to="add"
          className={cn(
            buttonVariants({
              size: "lg",
              rounded: "md",
              className: "text-base font-bold mb-8",
            })
          )}
        >
          Add Product
        </Link>

        <Input
          placeholder="Search here ..."
          className="w-full mb-4"
          onChange={tableSearch}
        />

        {data?.data && (
          <>
            <Suspense fallback={<Spinner />}>
              <Table headers={tableHeaders}>{renderProducts}</Table>
            </Suspense>
            <Pagination {...{ data, pageIndex, setPageIndex }} />
          </>
        )}
        {error && <ErrorMessage message="Something went wrong" />}
      </div>
    </>
  );
}

export default React.memo(Products);
