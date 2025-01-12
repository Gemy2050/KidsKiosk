import { deleteCategory } from "@/app/slices/CategoriesSlice";
import Alert from "@/components/Alert";
import ErrorMessage from "@/components/ErrorMessage";
import IconButton from "@/components/IconButton";
import Input from "@/components/Input";
import LinkButton from "@/components/LinkButton";
import PageTitle from "@/components/PageTitle";
import Spinner from "@/components/Spinner";
import Table from "@/components/Table";
import axiosInstance from "@/config/axios.config";
import { useToast } from "@/hooks/use-toast";
import useGetCategories from "@/hooks/useGetCategories";
import { IAxiosError } from "@/interfaces";
import { tableSearch } from "@/utils/functions";
import { AxiosError } from "axios";
import { PenBox, Trash } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

function Categories() {
  const tableHeaders = ["name", "description", "actions"];
  const [disabled, setDisabled] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();

  const { data: categories, error } = useGetCategories();

  const handleDeleteCategory = async (catId: number | string) => {
    try {
      setDisabled(true);
      await axiosInstance.delete(`/category/delete-category?id=${catId}`);
      toast({
        title: "Done",
        description: "Category deleted successfully",
        variant: "success",
      });
      dispatch(deleteCategory(String(catId)));
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
  const renderCategories = categories?.map((cat, idx: number) => (
    <tr key={cat.id}>
      <td>{idx + 1}</td>
      <td>{cat.name}</td>
      <td dangerouslySetInnerHTML={{ __html: cat.description }}></td>

      <td className="space-x-2 min-w-[105px]">
        <LinkButton to={`edit/${cat.id}`} size={"xs"} rounded={"md"}>
          <PenBox size={16} />
        </LinkButton>
        <Alert
          onDelete={() => handleDeleteCategory(cat.id)}
          title={`Are you sure to delete "${cat.name}" category?`}
          description="you cannot retrieve this category after deleting it."
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
        <h2 className="text-lg sm:text-2xl">Categories</h2>
      </PageTitle>

      <div className="mt-2 p-4 rounded-lg bg-background">
        <LinkButton
          to="add"
          size="lg"
          rounded="md"
          className="text-base font-bold mb-8"
          data-aos="fade-up"
        >
          Add Category
        </LinkButton>

        <Input
          type="search"
          placeholder="Search here ..."
          className="w-full mb-4"
          data-aos="fade-up"
          onChange={tableSearch}
        />

        {categories ? (
          <Table headers={tableHeaders}>{renderCategories}</Table>
        ) : (
          <Spinner />
        )}
        {error && <ErrorMessage message="Something went wrong" />}
      </div>
    </div>
  );
}

export default Categories;
