import Input from "@/components/Input";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { CornerUpRight } from "lucide-react";
import { useRef, useState } from "react";

import TinyEditor from "@/components/TinyEditor";
import { Editor as TinyMCEEditor } from "tinymce";
import LinkButton from "@/components/LinkButton";
import axiosInstance from "@/config/axios.config";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { IAxiosError } from "@/interfaces";
import { useQueryClient } from "@tanstack/react-query";
import InputGroup from "@/components/InputGroup";

function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [disabled, setDisabled] = useState(false);
  const editorRef = useRef<TinyMCEEditor>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleAddCategory = async () => {
    try {
      setDisabled(true);
      const description = editorRef.current?.getContent();

      if (!categoryName) {
        toast({
          title: "Error",
          description: "Please fill all fields",
          variant: "destructive",
        });
        return;
      }

      await axiosInstance.post(
        `/category/add-category?categoryName=${categoryName}&description=${description}`
      );
      setCategoryName("");
      editorRef.current?.setContent("");
      toast({
        title: "Done",
        description: "Category added successfully",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["getAllCategories"] });
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
        <LinkButton size="sm" to="/admin/categories">
          <CornerUpRight size={40} strokeWidth={2.5} />
        </LinkButton>
      </PageTitle>
      <div className="mt-2 p-5 pt-7 rounded-lg bg-background">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-8">
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
            className="absolute z-20 px-2 left-4 -top-3 text-sm text-gray-500 bg-white"
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
