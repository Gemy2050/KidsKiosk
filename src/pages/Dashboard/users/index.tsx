import ErrorMessage from "@/components/ErrorMessage";
import Input from "@/components/Input";
import PageTitle from "@/components/PageTitle";
import Spinner from "@/components/Spinner";
import Table from "@/components/Table";
import useCustomQuery from "@/hooks/use-cutstom-query";
import { IUser } from "@/interfaces";
import { tableSearch } from "@/utils/functions";
import { useMemo } from "react";

function Customers() {
  const { data, isLoading, error } = useCustomQuery<{ users: IUser[] }>({
    key: ["getUsers"],
    url: `/get-users`,
  });

  const tableHeaders = useMemo(
    () => ["image", "name", "email", "phone", "address", "created at"],
    []
  );

  // ** Render **
  const renderCategories = data?.users?.map((user, idx: number) => (
    <tr key={user.id}>
      <td>{idx + 1}</td>
      <td>
        <img
          src={user.image}
          alt="user image"
          className="w-[80px] h-[50px] mx-auto"
          loading="lazy"
        />
      </td>
      <td className="capitalize">
        {user.firstName} {user.secondName}
      </td>
      <td>{user.email}</td>
      <td>{user.phone || "-"}</td>
      <td>{user.address || "-"}</td>
      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
    </tr>
  ));

  return (
    <div>
      <PageTitle>
        <h2 className="text-lg sm:text-2xl">Customers</h2>
      </PageTitle>

      <div className="mt-2 p-4 rounded-lg bg-background">
        <Input
          type="search"
          placeholder="Search here ..."
          className="w-full mb-4"
          data-aos="fade-up"
          onChange={tableSearch}
        />

        {!isLoading ? (
          <Table headers={tableHeaders}>{renderCategories}</Table>
        ) : (
          <Spinner />
        )}
        {error && <ErrorMessage message="Something went wrong" />}
      </div>
    </div>
  );
}

export default Customers;
