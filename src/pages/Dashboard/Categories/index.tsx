import Alert from "@/components/Alert";
import ErrorMessage from "@/components/ErrorMessage";
import IconButton from "@/components/IconButton";
import Input from "@/components/Input";
import LinkButton from "@/components/LinkButton";
import PageTitle from "@/components/PageTitle";
import Spinner from "@/components/Spinner";
import axiosInstance from "@/config/axios.config";
import useCustomQuery from "@/hooks/use-cutstom-query";
import { useToast } from "@/hooks/use-toast";
import { Category, IAxiosError } from "@/interfaces";
import { tableSearch } from "@/utils/functions";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { PenBox, Trash } from "lucide-react";
import { lazy, Suspense, useState } from "react";

const Table = lazy(() => import("@/components/Table"));

function Categories() {
  const tableHeaders = ["name", "description", "actions"];
  const [disabled, setDisabled] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories, error } = useCustomQuery<Category[]>({
    key: ["getAllCategories"],
    url: "/category/get-all-categories",
  });

  const handleDeleteCategory = async (catId: number | string) => {
    try {
      setDisabled(true);
      await axiosInstance.delete(`/category/delete-category?id=${catId}`);
      toast({
        title: "Done",
        description: "Category deleted successfully",
        variant: "success",
      });
      // setCategories((prev) => prev.filter((cat) => cat.id !== catId));
      queryClient.invalidateQueries({ queryKey: ["getAllCategories"] });
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
        >
          Add Category
        </LinkButton>

        <Input
          type="search"
          placeholder="Search here ..."
          className="w-full mb-4"
          onChange={tableSearch}
        />

        {categories && (
          <Suspense fallback={<Spinner />}>
            <Table headers={tableHeaders}>{renderCategories}</Table>
          </Suspense>
        )}
        {error && <ErrorMessage message="Something went wrong" />}
      </div>
    </div>
  );
}

export default Categories;
