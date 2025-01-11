import Alert from "@/components/Alert";
import ErrorMessage from "@/components/ErrorMessage";
import IconButton from "@/components/IconButton";
import Input from "@/components/Input";
import LinkButton from "@/components/LinkButton";
import PageTitle from "@/components/PageTitle";
import Spinner from "@/components/Spinner";
import Table from "@/components/Table";
import axiosInstance from "@/config/axios.config";
import useCustomQuery from "@/hooks/use-cutstom-query";
import { useToast } from "@/hooks/use-toast";
import { IAxiosError, Product } from "@/interfaces";
import { tableSearch } from "@/utils/functions";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface IQuery {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: Product[];
}

function Images() {
  const tableHeaders = ["image", "actions"];
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [disabled, setDisabled] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { productId } = useParams();

  const {
    data: products,
    error,
    isLoading,
  } = useCustomQuery<IQuery>({
    key: ["getAllProducts"],
    url: "/product/get-all-products?pageSize=1000&pageIndex=1",
  });

  useEffect(() => {
    if (products) {
      const product = products.data?.find(
        (product) => String(product.id) == String(productId)
      );
      setProduct(product);
    }
  }, [products, productId]);

  const handleDeleteImage = async (imgId: number, imageUrl: string) => {
    try {
      setDisabled(true);
      const formData = new FormData();
      formData.append("id", String(imgId));
      await axiosInstance.delete(
        `productImage/delete-image?id=${imgId}&imageUrl=${imageUrl}`,
        {
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast({
        title: "Done",
        description: "Image deleted successfully",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
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
  const deletAllImages = async () => {
    try {
      setDisabled(true);
      await axiosInstance.delete(
        `/productImage/delete-all-images?id=${productId}`
      );
      toast({
        title: "Done",
        description: "All Images deleted successfully",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
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

  // ** Render **

  const renderImages = product?.productImages?.map((img, idx: number) => (
    <tr key={img.id}>
      <td>{idx + 1}</td>
      <td>
        <img
          src={img.imageUrl}
          alt="product image"
          className="w-[100px] h-[70px] mx-auto"
          loading="lazy"
        />
      </td>

      <td className="space-x-2 min-w-[105px] ">
        {/* <LinkButton to={`edit/${img.id}`} size={"xs"} rounded={"md"}>
          <PenBox size={16} />
        </LinkButton> */}
        <Alert
          onDelete={() => handleDeleteImage(img.id, img.imageUrl)}
          title={`Are you sure to delete "${idx + 1}" image?`}
          description="you cannot retrieve this image after deleting it."
          disabled={disabled}
        >
          <IconButton rounded={"md"} variant={"destructive"}>
            <Trash size={16} />
          </IconButton>
        </Alert>
      </td>
    </tr>
  ));

  return (
    <div>
      <PageTitle>
        <h2 className="text-lg sm:text-2xl">Product Images</h2>
      </PageTitle>

      <div className="mt-2 p-4 rounded-lg bg-background">
        <LinkButton
          to="add"
          size="lg"
          rounded="md"
          className="text-base font-bold mb-5 me-3"
        >
          Add Images
        </LinkButton>
        <Alert
          title="Are you sure to delete all images?"
          onDelete={deletAllImages}
          disabled={disabled}
        >
          <IconButton
            variant="destructive"
            size="lg"
            rounded="md"
            className=" text-base font-bold mb-8"
          >
            Delete All Images
          </IconButton>
        </Alert>

        <Input
          type="search"
          placeholder="Search here ..."
          className="w-full mb-4"
          onChange={tableSearch}
        />

        {!isLoading && products ? (
          <Table headers={tableHeaders}>{renderImages}</Table>
        ) : (
          <Spinner />
        )}
        {product?.productImages?.length === 0 && (
          <h3 className="text-center text-xl text-gray-500">No Images</h3>
        )}
        {error && <ErrorMessage message="Something went wrong" />}
      </div>
    </div>
  );
}

export default Images;
