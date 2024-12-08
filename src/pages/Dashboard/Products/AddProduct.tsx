import Input from "@/components/Input";
import PageTitle from "@/components/PageTitle";
import Select from "@/components/Select";
import { Button, buttonVariants } from "@/components/ui/button";
import { CornerUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

function AddProduct() {
  const [hasDiscount, setHasDiscount] = useState(false);
  const [editorValue] = useState("");
  const editorRef = useRef<Editor | null>(null);

  const handleEditorInit = (_evt: any, editor: Editor) => {
    editorRef.current = editor;
  };
  return (
    <div>
      <PageTitle>
        <h2 className="text-lg sm:text-2xl">Add Product</h2>
        <Link
          to="/admin/products"
          className={cn(
            buttonVariants({
              size: "sm",
              className: "text-3xl",
            })
          )}
        >
          <CornerUpRight size={40} strokeWidth={2.5} />
        </Link>
      </PageTitle>
      <div className="mt-2 p-5 pt-7 rounded-lg bg-background">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8">
          <div className="relative">
            <label
              htmlFor="image"
              className="absolute px-2 left-4 -top-3 text-sm text-gray-500 bg-white"
            >
              product image
            </label>
            <Input id="image" className="text-[15px]" type="file" />
          </div>
          <div className="relative">
            <label
              htmlFor="title"
              className="absolute px-2 left-4 -top-3 text-sm text-gray-500 bg-white"
            >
              product title
            </label>
            <Input id="title" className="text-[15px]" />
          </div>

          <div className="relative">
            <label
              htmlFor="category"
              className="absolute px-2 left-4 -top-3 text-sm text-gray-500 bg-white"
            >
              category
            </label>
            <Select name="category" id="category">
              <option value="1">1</option>
              <option value="2">2</option>
            </Select>
          </div>

          <div className="relative">
            <label
              htmlFor="quantity"
              className="absolute px-2 left-4 -top-3 text-sm text-gray-500 bg-white"
            >
              product quantity
            </label>
            <Input id="quantity" className="text-[15px]" type="number" />
          </div>

          <div className="relative">
            <label
              htmlFor="price"
              className="absolute px-2 left-4 -top-3 text-sm text-gray-500 bg-white"
            >
              product price
            </label>
            <Input id="price" className="text-[15px]" type="number" />
          </div>

          <div className="relative">
            <label
              htmlFor="hasDiscount"
              className="absolute px-2 left-4 -top-3 text-sm text-gray-500 bg-white"
            >
              has discount ?
            </label>
            <Select
              name="hasDiscount"
              id="hasDiscount"
              onChange={(e) => setHasDiscount(e.target.value === "true")}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </Select>
          </div>

          {hasDiscount && (
            <div className="relative">
              <label
                htmlFor="Discount"
                className="absolute px-2 left-4 -top-3 text-sm text-gray-500 bg-white"
              >
                Discount
              </label>
              <Input id="Discount" className="text-[15px]" type="number" />
            </div>
          )}
        </div>
        <div className="relative mt-8">
          <label
            htmlFor="Discount"
            className="absolute z-20 px-2 left-4 -top-3 text-sm text-gray-500 bg-white"
          >
            product description
          </label>
          <Editor
            apiKey={import.meta.env.VITE_TINY_API_KEY}
            onInit={handleEditorInit}
            initialValue={editorValue}
            init={{
              height: 350,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | link image" +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help | code",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
        <Button size={"lg"} rounded={"md"} className="mt-10  ">
          Add Product
        </Button>
      </div>
    </div>
  );
}

export default AddProduct;
