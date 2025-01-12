import Input from "@/components/Input";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { CornerUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import TinyEditor from "@/components/TinyEditor";
import { Editor as TinyMCEEditor } from "tinymce";
import LinkButton from "@/components/LinkButton";
import axiosInstance from "@/config/axios.config";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { IAxiosError } from "@/interfaces";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Loader from "@/components/Loader";
import useGetCategories from "@/hooks/useGetCategories";
import { useDispatch } from "react-redux";
import { updateCategory } from "@/app/slices/CategoriesSlice";

function EditCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [disabled, setDisabled] = useState(false);
  const editorRef = useRef<TinyMCEEditor>(null);
  const { toast } = useToast();
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: categories, isLoading } = useGetCategories();

  const category = categories?.find((el) => el.id == productId);

  console.log({ name: categoryName });

  useEffect(() => {
    if (categories) {
      setCategoryName(category?.name || "");
      setDescription(category?.description || "");
    }
  }, [categories]);

  if (isLoading) {
    return <Loader />;
  }

  if (!categories || !category) {
    return <Navigate to="/admin/categories" replace />;
  }

  const handleEditCategory = async () => {
    try {
      setDisabled(true);
      const description = editorRef.current?.getContent() || "";

      if (!categoryName) {
        toast({
          title: "Error",
          description: "Please fill all fields",
          variant: "destructive",
        });
        return;
      }
      console.log({ categoryName });

      const { data } = await axiosInstance.put(
        `/category/update-category?id=${productId}&categoryName=${categoryName}&description=${description}`
      );
      dispatch(updateCategory(data));

      navigate("/admin/categories");
      setCategoryName("");
      editorRef.current?.setContent("");

      toast({
        title: "Done",
        description: "Category updated successfully",
        variant: "success",
      });
    } catch (err) {
      const error = err as AxiosError<IAxiosError>;
      toast({
        title: "Error",
        description: error.response?.data.message,
        variant: "destructive",
      });
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div>
      <PageTitle>
        <h2 className="text-lg sm:text-2xl">Edit Category</h2>
        <LinkButton size="sm" to="/admin/categories">
          <CornerUpRight size={40} strokeWidth={2.5} />
        </LinkButton>
      </PageTitle>
      <div className="mt-2 p-5 pt-7 rounded-lg bg-background">
        <div
          className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-x-3 gap-y-8"
          data-aos="fade-up"
        >
          <div className="relative">
            <label
              htmlFor="name"
              className="absolute px-2 left-4 -top-3 text-sm text-gray-500 bg-white"
            >
              category name
            </label>
            <Input
              id="name"
              className="text-[15px]"
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
        </div>

        <div className="relative mt-8" data-aos="fade-up">
          <label
            htmlFor="Discount"
            className="absolute z-20 px-2 left-4 -top-3 text-sm text-gray-500 bg-white"
          >
            category description
          </label>
          <TinyEditor initialValue={description} editorRef={editorRef} />
        </div>
        <Button
          size={"lg"}
          rounded={"md"}
          className="mt-10 "
          data-aos="fade-up"
          disabled={disabled}
          onClick={handleEditCategory}
        >
          Update Category
        </Button>
      </div>
    </div>
  );
}

export default EditCategory;
