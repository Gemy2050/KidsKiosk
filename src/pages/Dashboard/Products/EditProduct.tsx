import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { CornerUpRight } from "lucide-react";
import { Fragment, useEffect } from "react";
import useCustomQuery from "@/hooks/use-cutstom-query";
import { Product } from "@/interfaces";
import Loader from "@/components/Loader";
import ColorBox from "@/components/ColorBox";
import { ProductsForm } from "@/data";
import { renderField } from "@/utils/FormUtils";
import { Link, Navigate, useParams } from "react-router-dom";
import Popup from "@/components/Popup";
import { useProductManagement } from "@/hooks/useProductManagement";
import { getImagePreviewUrl } from "@/utils/imageUtils";
import { ProductForm } from "@/validation";
import { SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

function EditProduct() {
  const {
    editorRef,
    categories,
    categoryLoading,
    handleEditProduct,
    addNewColorBox,
    productFormMethods,
  } = useProductManagement();

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = productFormMethods;

  const productFormData = watch();

  const { productId } = useParams();
  const { products } = useSelector((state: RootState) => state.products);

  const productFound = products.find((product) => product.id === productId);

  const {
    data,
    isLoading: productLoading,
    isError,
  } = useCustomQuery<Product>({
    key: ["getProduct", `${productId}`],
    url: `/product/get-product?id=${productId}`,
    options: {
      enabled: !productFound,
    },
  });

  const product = data || productFound;

  useEffect(() => {
    if (product) {
      const {
        name,
        description,
        price,
        productCategoryId,
        hasDiscount,
        priceBeforeDiscount,
        imageUrl,
        variants,
      } = product;

      reset({
        name,
        description,
        price,
        hasDiscount: hasDiscount ? "Yes" : "No",
        discount: hasDiscount ? priceBeforeDiscount - price : 0,
        productCategoryId: String(productCategoryId),
        imageUrl,
        image: undefined,
      });
      setValue("colors", variants);
    }
  }, [product]);

  const onSubmit: SubmitHandler<ProductForm> = async (data) => {
    const result = await handleEditProduct(productId!, data);
    if (result) reset();
  };

  const onError = () => {
    // To Focus Tinymce Editor Manually
    if (errors.description) {
      editorRef.current?.focus();
      return;
    }
  };

  if (productLoading || categoryLoading) return <Loader />;
  if (isError) return <Navigate to="/admin/products" replace />;

  return (
    <div className=" p-0">
      <Popup>
        <img
          src={
            productFormData.image instanceof FileList &&
            productFormData.image.length > 0
              ? getImagePreviewUrl(productFormData.image as any)
              : product?.imageUrl
          }
          alt="Product"
          loading="lazy"
          className="object-contain h-full w-full"
        />
      </Popup>
      <PageTitle>
        <h2 className="text-lg sm:text-2xl">Edit Product</h2>
        <Link relative="path" to="../..">
          <CornerUpRight size={40} strokeWidth={2.5} />
        </Link>
      </PageTitle>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="mt-2 p-5 pt-7 rounded-lg bg-background"
      >
        {/* Render Inputs */}
        <div
          data-aos="fade-up"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8"
        >
          {ProductsForm.map((field, idx) => (
            <Fragment key={idx}>
              {renderField({
                editorRef,
                dynamicOptions: categories,
                field,
                productFormMethods,
              })}
            </Fragment>
          ))}
        </div>

        <div className="my-8" data-aos="fade-up">
          <div className="mb-3 flex items-center gap-x-2">
            <h3 className="text-2xl text-gray-400">Product Colors: </h3>
            <Button
              rounded={"full"}
              className="text-2xl w-8 h-8"
              onClick={addNewColorBox}
            >
              +
            </Button>
          </div>

          {/* Render Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-8">
            {productFormData.colors?.map((el, idx) => (
              <ColorBox
                key={el.id as string}
                index={idx}
                colorId={el.id as string}
                colors={productFormData.colors as any}
                productFormMethods={productFormMethods}
              />
            ))}
          </div>
        </div>

        <Button
          size={"lg"}
          rounded={"md"}
          className="mt-10 text-base font-bold"
          disabled={isSubmitting}
        >
          Update Product
        </Button>
      </form>
    </div>
  );
}

export default EditProduct;
