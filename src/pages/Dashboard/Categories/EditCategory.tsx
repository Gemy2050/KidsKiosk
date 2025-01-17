import Input from "@/components/Input";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { CornerUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import TinyEditor from "@/components/TinyEditor";
import { Editor as TinyMCEEditor } from "tinymce";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { IAxiosError } from "@/interfaces";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Loader from "@/components/Loader";
import useGetCategories from "@/hooks/useGetCategories";
import { useDispatch } from "react-redux";
import { updateCategory } from "@/app/slices/CategoriesSlice";
import { editCategory } from "@/services/category";

function EditCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [disabled, setDisabled] = useState(false);
  const editorRef = useRef<TinyMCEEditor>(null);
  const { toast } = useToast();
  const { catId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: categories, isLoading } = useGetCategories();

  const category = categories?.find((el) => el.id == catId);

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

      const { data } = await editCategory({
        catId: catId || "",
        categoryName,
        description,
      });
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
        <Link relative="path" to="../..">
          <CornerUpRight size={40} strokeWidth={2.5} />
        </Link>
      </PageTitle>
      <div
        className="mt-2 p-5 pt-7 rounded-lg bg-background"
        data-aos="fade-up"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-x-3 gap-y-8">
          <div className="relative">
            <label
              htmlFor="name"
              className="absolute px-2 left-4 -top-3 text-sm text-gray-500 bg-background"
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

        <div className="relative mt-8">
          <label
            htmlFor="Discount"
            className="absolute z-20 px-2 left-4 -top-3 text-sm text-gray-500 bg-background"
          >
            category description
          </label>
          <TinyEditor initialValue={description} editorRef={editorRef} />
        </div>
        <Button
          size={"lg"}
          rounded={"md"}
          className="mt-10 "
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
