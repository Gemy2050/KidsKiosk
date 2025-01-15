import ErrorMessage from "@/components/ErrorMessage";
import Input from "@/components/Input";
import PageTitle from "@/components/PageTitle";
import Spinner from "@/components/Spinner";
import Table from "@/components/Table";
import useCustomQuery from "@/hooks/use-cutstom-query";
import { IUser } from "@/interfaces";
import { tableSearch } from "@/utils/functions";
import { format } from "date-fns";
import { RefreshCw } from "lucide-react";
import { useMemo } from "react";

function Users() {
  const { data, error, isFetching, refetch } = useCustomQuery<{
    users: IUser[];
  }>({
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
      <td>{format(user.createdAt, "dd MMM yyyy")}</td>
    </tr>
  ));

  return (
    <div>
      <PageTitle>
        <h2 className="text-lg sm:text-2xl">Users</h2>
        <RefreshCw
          size={25}
          className={`cursor-pointer hover:text-primary transition-all duration-500 ease-linear ${
            isFetching ? "animate-spin pointer-events-none opacity-50" : ""
          }`}
          onClick={() => refetch()}
        />
      </PageTitle>

      <div className="mt-2 p-4 rounded-lg bg-background">
        <Input
          type="search"
          placeholder="Search here ..."
          className="w-full mb-4"
          data-aos="fade-up"
          onChange={tableSearch}
        />

        {!isFetching ? (
          <Table headers={tableHeaders}>{renderCategories}</Table>
        ) : (
          <Spinner />
        )}
        {error && <ErrorMessage message="Something went wrong" />}
      </div>
    </div>
  );
}

export default Users;
