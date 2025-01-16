import { format } from "date-fns";
import { getStatusColor } from "@/utils/functions";
import { IOrder } from "@/interfaces";

interface OrderDetailsProps {
  order: IOrder;
}

const OrderDetails = ({ order }: OrderDetailsProps) => {
  return (
    <div className="space-y-6">
      {/* Order Summary Section */}
      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex flex-wrap justify-center sm:justify-between gap-5 items-center">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="font-medium">{order.id}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Order Date</p>
            <p className="font-medium">
              {format(new Date(order.createdAt), "dd MMM, yyyy - hh:mm a")}
            </p>
          </div>
        </div>
      </div>

      {/* Customer Details */}
      <div>
        <h3 className="font-semibold text-lg mb-3">Customer Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Full Name</p>
            <p className="font-medium capitalize">{`${order.firstName} ${order.secondName}`}</p>
          </div>
          <div className="space-y-1 md:col-span-2">
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{order.phone}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{order.email}</p>
          </div>

          <div className="space-y-1 md:col-span-2">
            <p className="text-sm text-muted-foreground">Shipping Address</p>
            <p className="font-medium">{order.address}</p>
          </div>
        </div>
      </div>

      <hr />

      {/* Order Items */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Order Items</h3>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${item.price}</p>
                <p className="text-sm text-muted-foreground">
                  Total: ${(item.price * item.quantity!).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Order Status</p>
            <span
              className={`inline-block mt-1 px-3 py-1 rounded-full text-sm ${getStatusColor(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="text-xl font-bold">${order.totalAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
