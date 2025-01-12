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

const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4500 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 5500 },
  { month: "Jul", sales: 7000 },
];

const topProducts = [
  { name: "Product A", sales: 120 },
  { name: "Product B", sales: 98 },
  { name: "Product C", sales: 86 },
  { name: "Product D", sales: 75 },
  { name: "Product E", sales: 65 },
];

const recentOrders = [
  {
    id: "#12345",
    customer: "Ahmed Ali",
    product: "Product A",
    amount: 120,
    status: "Completed",
  },
  {
    id: "#12346",
    customer: "Mohamed Omar",
    product: "Product B",
    amount: 150,
    status: "Pending",
  },
  {
    id: "#12347",
    customer: "Zain Nader",
    product: "Product C",
    amount: 200,
    status: "Processing",
  },
  {
    id: "#12348",
    customer: "Amir Hassan",
    product: "Product D",
    amount: 180,
    status: "Completed",
  },
];

const getStatusColor = (status: string) => {
  const colors = {
    Completed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Processing: "bg-blue-100 text-blue-800",
  };
  return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

const Dashboard = () => {
  const { data: products, isLoading: productsLoading } = useCustomQuery<any>({
    key: ["getAllProducts"],
    url: "/product/get-all-products",
  });
  const { data: users, isLoading: usersLoading } = useCustomQuery<any>({
    key: ["getUsers"],
    url: "/get-users",
  });

  if (productsLoading || usersLoading) {
    return <Loader />;
  }

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
              <h3 className="text-2xl font-bold">24,560</h3>
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
              <h3 className="text-2xl font-bold">145</h3>
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
              <h3 className="text-2xl font-bold">{products.data.length}</h3>
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
              <h3 className="text-2xl font-bold">{users.users.length}</h3>
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
              <XAxis dataKey="month" />
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
              <Bar dataKey="sales" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card className="p-6 transition-all duration-300 hover:shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <Table headers={["Customer", "Product", "Amount", "Status"]}>
          {recentOrders.map((order) => (
            <tr key={order.id} className="border-b  p-8">
              <td className="p-4">{order.id}</td>
              <td className="p-4">{order.customer}</td>
              <td className="p-4">{order.product}</td>
              <td className="p-4">${order.amount}</td>
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
  );
};

export default Dashboard;
