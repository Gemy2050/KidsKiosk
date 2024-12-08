import Input from "@/components/Input";
import PageTitle from "@/components/PageTitle";
import Table from "@/components/Table";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PenBox, Trash } from "lucide-react";
import { Link } from "react-router-dom";

interface product {
  id: number;
  name: string;
  title: string;
  description: string;
  quantity: number;
}

const products: product[] = [
  {
    id: 1,
    name: "Product 1",
    title: "Product 1",
    description: "Product 1",
    quantity: 10,
  },
  {
    id: 2,
    name: "Product 2",
    title: "Product 2",
    description: "Product 2",
    quantity: 20,
  },
  {
    id: 3,
    name: "Product 3",
    title: "Product 3",
    description: "Product 3",
    quantity: 30,
  },
  {
    id: 4,
    name: "Product 4",
    title: "Product 4",
    description: "Product 4",
    quantity: 40,
  },
];

function Products() {
  const tableHeaders = ["name", "title", "description", "quantity", "actions"];

  return (
    <div>
      <PageTitle>
        <h2 className="text-lg sm:text-2xl">Products</h2>
      </PageTitle>

      <div className="mt-2 p-4 rounded-lg bg-background">
        <Link
          to="add"
          className={cn(
            buttonVariants({
              size: "lg",
              rounded: "md",
              className: "text-base font-bold mb-8",
            })
          )}
        >
          Add Product
        </Link>

        <Input placeholder="Search here ..." className="w-full mb-4" />

        <Table headers={tableHeaders}>
          {products.map((product, idx: number) => (
            <tr key={product.id}>
              <td>{idx + 1}</td>
              <td>{product.name}</td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.quantity}</td>
              <td className="flex gap-2">
                <Button size={"xs"} rounded={"md"}>
                  <PenBox size={16} />
                </Button>
                <Button size={"xs"} rounded={"md"} variant={"destructive"}>
                  <Trash size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}

export default Products;
