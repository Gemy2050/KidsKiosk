import Alert from "@/components/Alert";
import ErrorMessage from "@/components/ErrorMessage";
import IconButton from "@/components/IconButton";
import Input from "@/components/Input";
import LinkButton from "@/components/LinkButton";
import PageTitle from "@/components/PageTitle";
import Pagination from "@/components/Pagination";
import Spinner from "@/components/Spinner";
import { buttonVariants } from "@/components/ui/button";
import useCustomQuery from "@/hooks/use-cutstom-query";
import { toast } from "@/hooks/use-toast";
import { IAxiosError, IQuery, Product } from "@/interfaces";
import { tableSearch } from "@/utils/functions";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Image, PenBox, Trash } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProducts } from "@/app/slices/ProductsSlice";
import Table from "@/components/Table";
import { deleteProduct } from "@/services/product";

function Products() {
  const INDEX = Number(sessionStorage.getItem("productsIndex") || 1);

  const PAGE_SIZE = 5;
  const [pageIndex, setPageIndex] = useState(INDEX);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  const tableHeaders = useMemo(
    () => ["image", "name", "category", "price", "discount", "actions"],
    []
  );

  const QueryClient = useQueryClient();

  const { data, error } = useCustomQuery<IQuery<Product>>({
    key: ["getAllProducts", `${pageIndex}`],
    url: `/product/get-all-products?pageSize=${PAGE_SIZE}&pageIndex=${pageIndex}`,
  });

  useEffect(() => {
    if (data) {
      dispatch(setProducts(data.data));
    }
  }, [data]);

  useEffect(() => {
    sessionStorage.setItem("productsIndex", pageIndex.toString());
  }, [pageIndex]);

  const handleDeleteProduct = async (id: number | string) => {
    try {
      setDisabled(true);
      await deleteProduct(id);
      toast({
        title: "Done",
        description: "Product deleted successfully",
        variant: "success",
      });

      if (data?.data.length === 1 && pageIndex > 1) {
        const newPageIndex = pageIndex - 1;

        setPageIndex(newPageIndex);
        QueryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === "getAllProducts" ||
            query.queryKey[0] === "getAnalytics" ||
            query.queryKey[1] === `${newPageIndex}`,
        });
        return;
      }
      QueryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "getAllProducts" ||
          query.queryKey[0] === "getAnalytics",
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
      <td>{(pageIndex - 1) * PAGE_SIZE + (idx + 1)}</td>
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
          data-aos="fade-up"
        >
          Add Product
        </Link>

        <Input
          placeholder="Search here ..."
          className="w-full mb-4"
          data-aos="fade-up"
          onChange={tableSearch}
        />

        {data?.data ? (
          <>
            <Table headers={tableHeaders}>{renderProducts}</Table>
            <Pagination {...{ data, pageIndex, setPageIndex }} />
          </>
        ) : (
          <Spinner />
        )}
        {error && <ErrorMessage message="Something went wrong" />}
      </div>
    </>
  );
}

export default React.memo(Products);
