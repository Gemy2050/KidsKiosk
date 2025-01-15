import { RootState } from "@/app/store";
import Product from "./Products/Product";
import { Heart, Package } from "lucide-react";
import { useSelector } from "react-redux";

export default function Favorites() {
  const { favorites } = useSelector((state: RootState) => state.favorites);

  return (
    <main className="relative pt-24  pb-20">
      <img
        className="absolute top-0 w-full h-[130px] z-[-1]"
        src="/imgs/pill-shape.png"
        alt="shape"
        width={100}
        height={200}
      />
      <div className="container py-10 sm:px-10  rounded-lg">
        <h2
          data-aos="fade-up"
          className="text-2xl sm:text-4xl mb-8 font-semibold flex items-center gap-2"
        >
          Favorites <Heart size={30} />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center">
          {favorites.length > 0 ? (
            favorites.map((product) => (
              <Product product={product} key={product.id} />
            ))
          ) : (
            <div
              className="col-span-full text-center p-10 bg-background rounded-lg border border-border"
              data-aos="fade-up"
            >
              <Package
                size={40}
                className="mx-auto mb-4 text-muted-foreground"
              />
              <h3 className="text-xl font-semibold mb-2">No Favorites Yet</h3>
              <p className="text-muted-foreground">
                Your Favorites items will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
