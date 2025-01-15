import { Card } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  DollarSign,
  Package,
  RefreshCw,
  ShoppingCart,
  Users,
} from "lucide-react";
import PageTitle from "@/components/PageTitle";
import useCustomQuery from "@/hooks/use-cutstom-query";
import Table from "@/components/Table";
import { format } from "date-fns";
import { useTheme } from "next-themes";
import { getStatusColor } from "@/utils/functions";
import { useMemo } from "react";
import Spinner from "@/components/Spinner";
import { IOrder } from "@/interfaces";

const Dashboard = () => {
  const { theme } = useTheme();

  const {
    data: analytics,
    refetch,
    isFetching,
    isLoading,
  } = useCustomQuery<any>({
    key: ["getAnalytics"],
    url: "/analytics",
  });

  const {
    charts: { topProducts, salesOverview },
    metrics: { totalCustomers, totalOrders, totalProducts, totalRevenue },
    recentOrders,
  } = analytics || { charts: {}, metrics: {} };

  const headers = useMemo(() => {
    return [
      "name",
      "Email",
      "address",
      "Toatal amount",
      "Created at",
      "Status",
    ];
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <Spinner />
      </div>
    );
  }

  const salesData = salesOverview?.map((day: any) => ({
    date: format(day.createdAt, "MMM dd"),
    sales: day._sum.totalAmount || 0,
  }));

  // Render Orders Table
  const renderRecentOrders = recentOrders?.map((order: IOrder, idx: number) => (
    <tr key={order.id}>
      <td className="!p-5">{idx + 1}</td>
      <td className="!p-5 capitalize">
        {order.firstName + " " + order.secondName}
      </td>
      <td className="!p-5">{order.email}</td>
      <td className="!p-5">{order.address}</td>
      <td className="!p-5">${order.totalAmount}</td>
      <td className="!p-5">
        {format(new Date(order.createdAt), "dd MMM, yyyy - hh:mm a")}
      </td>
      <td className="!p-5">
        <span
          className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
            order.status
          )}`}
        >
          {order.status}
        </span>
      </td>
    </tr>
  ));

  return (
    <div className="space-y-3">
      <PageTitle>
        <h2 className="text-lg sm:text-2xl">Analytics</h2>
        <RefreshCw
          size={25}
          className={`cursor-pointer hover:text-primary transition-all duration-500 ease-linear ${
            isFetching ? "animate-spin pointer-events-none opacity-50" : ""
          }`}
          onClick={() => refetch()}
        />
      </PageTitle>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          data-aos="fade-up"
          className="bg-background p-4  !transition-all !duration-500 hover:!scale-105 hover:shadow-xl cursor-pointer border-l-4 border-l-blue-500"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full transition-colors duration-300 hover:bg-blue-200">
              <DollarSign className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Revenue</p>
              <h3 className="text-2xl font-bold">{totalRevenue}</h3>
            </div>
          </div>
        </Card>
        <Card
          data-aos="fade-up"
          className="bg-background p-4 !transition-all !duration-500 hover:!scale-105 hover:shadow-xl cursor-pointer border-l-4 border-l-green-500"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full transition-colors duration-300 hover:bg-green-200">
              <ShoppingCart className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground"> Orders</p>
              <h3 className="text-2xl font-bold">{totalOrders}</h3>
            </div>
          </div>
        </Card>
        <Card
          data-aos="fade-up"
          className="bg-background p-4 !transition-all !duration-500 hover:!scale-105 hover:shadow-xl cursor-pointer border-l-4 border-l-purple-500"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full transition-colors duration-300 hover:bg-purple-200">
              <Package className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground"> Products</p>
              <h3 className="text-2xl font-bold">{totalProducts}</h3>
            </div>
          </div>
        </Card>
        <Card
          data-aos="fade-up"
          className="bg-background p-4 !transition-all !duration-500 hover:!scale-105 hover:shadow-xl cursor-pointer border-l-4 border-l-orange-500"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-100 rounded-full transition-colors duration-300 hover:bg-orange-200">
              <Users className="text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground"> Customers</p>
              <h3 className="text-2xl font-bold">{totalCustomers}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          data-aos="fade-right"
          className="p-6 transition-all duration-300 hover:shadow-lg bg-background"
        >
          <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray=".5" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip
                formatter={(value) => [`$${value}`, "sales"]}
                contentStyle={{
                  backgroundColor: theme == "dark" ? "#1a1a1a" : "#fff",
                  border: `1px solid ${
                    theme == "dark" ? "#404040" : "#e0e0e0"
                  }`,
                  color: theme == "dark" ? "#fff" : "#333",
                }}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card
          data-aos="fade-left"
          className="p-6 transition-all duration-300 hover:shadow-lg bg-background"
        >
          <h3 className="text-lg font-semibold mb-4">Top Products</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray=".5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme == "dark" ? "#1a1a1a" : "#fff",
                  border: `1px solid ${
                    theme == "dark" ? "#404040" : "#e0e0e0"
                  }`,
                  color: theme == "dark" ? "#fff" : "#333",
                }}
              />
              <Bar dataKey="quantity" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Orders Table */}
        <Card
          className="bg-background col-span-full p-6 transition-all duration-300 hover:shadow-lg"
          data-aos="fade-up"
          data-aos-offset="50"
        >
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <Table className="!min-w-[980px]" headers={headers}>
            {renderRecentOrders}
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
