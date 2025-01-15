import Input from "@/components/Input";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { CornerUpRight } from "lucide-react";
import { useRef, useState } from "react";

import TinyEditor from "@/components/TinyEditor";
import { Editor as TinyMCEEditor } from "tinymce";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { Category, IAxiosError } from "@/interfaces";
import InputGroup from "@/components/InputGroup";
import { useDispatch } from "react-redux";
import { addCategory } from "@/app/slices/CategoriesSlice";
import { Link } from "react-router-dom";
import { addNewCategory } from "@/services/category";

function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [disabled, setDisabled] = useState(false);
  const editorRef = useRef<TinyMCEEditor>(null);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const handleAddCategory = async () => {
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

      const { data } = await addNewCategory(categoryName, description);
      setCategoryName("");
      editorRef.current?.setContent("");
      toast({
        title: "Done",
        description: "Category added successfully",
        variant: "success",
      });

      dispatch(addCategory(data as Category));
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
        <h2 className="text-lg sm:text-2xl">Add Category</h2>
        <Link relative="path" to="..">
          <CornerUpRight size={40} strokeWidth={2.5} />
        </Link>
      </PageTitle>
      <div
        className="mt-2 p-5 pt-7 rounded-lg bg-background"
        data-aos="fade-up"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-x-3 gap-y-8">
          <InputGroup>
            <label htmlFor="name">category name</label>
            <Input
              id="name"
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </InputGroup>
        </div>

        <div className="relative mt-8">
          <label
            htmlFor="Discount"
            className="absolute z-20 px-2 left-4 -top-3 text-sm text-gray-500 bg-background"
          >
            category description
          </label>
          <TinyEditor editorRef={editorRef} />
        </div>
        <Button
          size={"lg"}
          rounded={"md"}
          className="mt-10 text-base font-bold"
          disabled={disabled}
          onClick={handleAddCategory}
        >
          Add Category
        </Button>
      </div>
    </div>
  );
}

export default AddCategory;
