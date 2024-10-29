import { IProduct } from "@/interfaces";

export function getTotalPrice(cart: IProduct[]) {
  return cart
    .reduce((acc, item) => {
      return acc + item.quantity! * item.price;
    }, 0)
    .toFixed(2);
}
