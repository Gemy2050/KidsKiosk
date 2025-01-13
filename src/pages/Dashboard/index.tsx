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
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import PageTitle from "@/components/PageTitle";
import useCustomQuery from "@/hooks/use-cutstom-query";
import Loader from "@/components/Loader";
import Table from "@/components/Table";
import { format } from "date-fns";

const getStatusColor = (status: string) => {
  const colors = {
    completed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
  };
  return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

const Dashboard = () => {
  const { data: analytics, isLoading: analyticsLoading } = useCustomQuery<any>({
    key: ["getAnalytics"],
    url: "/analytics",
  });

  const {
    charts: { topProducts, salesOverview },
    metrics: { totalCustomers, totalOrders, totalProducts, totalRevenue },
    recentOrders,
  } = analytics || { charts: {}, metrics: {} };

  if (analyticsLoading) {
    return <Loader />;
  }

  const salesData = salesOverview?.map((day: any) => ({
    date: format(day.createdAt, "MMM dd"),
    sales: day._sum.totalAmount || 0,
  }));

  return (
    <div className=" space-y-3">
      <PageTitle>
        <h2 className="text-lg sm:text-2xl">Analytics (In Progress) </h2>
      </PageTitle>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          data-aos="fade-up"
          className="p-4 !transition-all !duration-500 hover:!scale-105 hover:shadow-xl cursor-pointer border-l-4 border-l-blue-500"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-full transition-colors duration-300 hover:bg-blue-200">
              <DollarSign className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <h3 className="text-2xl font-bold">{totalRevenue}</h3>
            </div>
          </div>
        </Card>
        <Card
          data-aos="fade-up"
          className="p-4 !transition-all !duration-500 hover:!scale-105 hover:shadow-xl cursor-pointer border-l-4 border-l-green-500"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-full transition-colors duration-300 hover:bg-green-200">
              <ShoppingCart className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <h3 className="text-2xl font-bold">{totalOrders}</h3>
            </div>
          </div>
        </Card>
        <Card
          data-aos="fade-up"
          className="p-4 !transition-all !duration-500 hover:!scale-105 hover:shadow-xl cursor-pointer border-l-4 border-l-purple-500"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-full transition-colors duration-300 hover:bg-purple-200">
              <Package className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Products</p>
              <h3 className="text-2xl font-bold">{totalProducts}</h3>
            </div>
          </div>
        </Card>
        <Card
          data-aos="fade-up"
          className="p-4 !transition-all !duration-500 hover:!scale-105 hover:shadow-xl cursor-pointer border-l-4 border-l-orange-500"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-100 rounded-full transition-colors duration-300 hover:bg-orange-200">
              <Users className="text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Customers</p>
              <h3 className="text-2xl font-bold">{totalCustomers}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          data-aos="fade-right"
          className="p-6 transition-all duration-300 hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
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
          className="p-6 transition-all duration-300 hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4">Top Products</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Recent Orders Table */}
        <Card
          className="col-span-full p-6 transition-all duration-300 hover:shadow-lg"
          data-aos="fade-up"
          data-aos-offset="50"
        >
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <Table
            className="min-w-[1000px]"
            headers={[
              "name",
              "Email",
              "address",
              "Toatal amount",
              "Created at",
              "Status",
            ]}
          >
            {recentOrders?.map((order: any, idx: number) => (
              <tr key={order.id} className="border-b  p-8">
                <td className="p-4">{idx + 1}</td>
                <td className="p-4">
                  {order.firstName + " " + order.secondName}
                </td>
                <td className="p-4">{order.email}</td>
                <td className="p-4">{order.address}</td>
                <td className="p-4">${order.totalAmount}</td>
                <td className="p-4">
                  {format(new Date(order.createdAt), "dd MMM, yyyy - hh:mm a")}
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
