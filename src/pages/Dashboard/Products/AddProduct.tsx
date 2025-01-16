import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { CornerUpRight } from "lucide-react";
import { Fragment } from "react";
import Loader from "@/components/Loader";
import ColorBox from "@/components/ColorBox";
import { ProductsForm } from "@/data/forms";
import { renderField } from "@/utils/FormUtils";
import Popup from "@/components/Popup";
import { useProductManagement } from "@/hooks/useProductManagement";
import { SubmitHandler } from "react-hook-form";
import { ProductForm } from "@/validation";
import { getImagePreviewUrl } from "@/utils/imageUtils";
import { Link } from "react-router-dom";

function AddProduct() {
  const {
    editorRef,
    categories,
    categoryLoading,
    handleAddProduct,
    addNewColorBox,
    productFormMethods,
  } = useProductManagement();

  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = productFormMethods;

  const productFormData = watch();

  const onSubmit: SubmitHandler<ProductForm> = async (data) => {
    const result = await handleAddProduct(data);
    if (result) reset();
  };
  const onError = () => {
    // To Focus Tinymce Editor Manually
    if (errors.description) {
      editorRef.current?.focus();
      return;
    }
  };

  if (categoryLoading) return <Loader />;

  return (
    <div className="p-0">
      <PageTitle>
        <h2 className="text-lg sm:text-2xl">Add Product</h2>
        <Link relative="path" to="..">
          <CornerUpRight size={40} strokeWidth={2.5} />
        </Link>
      </PageTitle>
      {/* Popup */}
      <Popup>
        <img
          src={getImagePreviewUrl(productFormData.image as any)}
          alt="Product"
          className="object-contain h-full w-full"
        />
      </Popup>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="mt-2 p-5 pt-7 rounded-lg bg-background"
      >
        {/* Render Inputs */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8"
          data-aos="fade-up"
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
              type="button"
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
                uniqueKey={Date.now()}
              />
            ))}
          </div>
        </div>

        <Button
          size={"lg"}
          rounded={"md"}
          className="mt-10 text-base font-bold"
          disabled={isSubmitting}
          type="submit"
        >
          Add Product
        </Button>
      </form>
    </div>
  );
}
export default AddProduct;
