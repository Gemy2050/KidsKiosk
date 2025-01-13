import { Package, Clock, DollarSign } from "lucide-react";
import { format } from "date-fns";
import useCustomQuery from "@/hooks/use-cutstom-query";
import { Product } from "@/interfaces";
import Loader from "@/components/Loader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { User } from "@/types";

interface IOrders {
  status: string;
  id: string;
  email: string;
  sessionId: string;
  items: Product[];
  totalAmount: number;
  createdAt: Date;
}

function Orders() {
  // const orders = useSelector((state: RootState) => state.orders.orders);

  const user: User = useAuthUser();

  const { data: orders, isLoading } = useCustomQuery<IOrders[]>({
    key: ["orders"],
    url: `/order?email=${user?.email}`,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="relative pt-20 pb-20">
      <img
        className="fixed top-0 w-full h-[200px] z-[-1]"
        src="/imgs/pill-shape.png"
        alt="shape"
        width={100}
        height={200}
      />

      <div className="container py-10">
        <h2
          data-aos="fade-up"
          className="text-2xl sm:text-4xl mb-8 font-semibold flex items-center gap-2"
        >
          My Orders <Package size={30} />
        </h2>

        <div className="grid gap-6">
          {orders?.map((order) => (
            <div
              key={order.sessionId}
              data-aos="fade-up"
              className="bg-background p-6 rounded-lg border border-border shadow-lg"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock size={20} />
                  {format(new Date(order.createdAt), "dd MMM, yyyy - hh:mm a")}
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <DollarSign size={20} />
                  Total: ${order.totalAmount}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {order.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-muted rounded-lg"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        Quantity: {item.quantity} × ${item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-muted rounded-lg flex items-center justify-between">
                <span className="font-medium">Order Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {order.status}
                </span>
              </div>
            </div>
          ))}

          {(!orders || orders?.length === 0) && (
            <div
              className="text-center p-10 bg-background rounded-lg border border-border"
              data-aos="fade-up"
            >
              <Package
                size={40}
                className="mx-auto mb-4 text-muted-foreground"
              />
              <h3 className="text-xl font-semibold mb-2">No Orders Yet</h3>
              <p className="text-muted-foreground">
                Your ordered items will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Orders;
