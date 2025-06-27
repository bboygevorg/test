import { Product } from "../store/types";

export const fetchProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products: Product[] = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        price: Math.round(Math.random() * 10000) / 100,
        description: `Description for product ${i + 1}`,
        imageUrl:
          "https://img.baba-blog.com/2024/07/Hand-arranging-wood-block-stacking-with-icon-Graph-and-shopping-cart-symbol-upward-direction.jpg?x-oss-process=style%2Ffull",
        inStock: true,
      }));
      resolve(products);
    }, 1000);
  });
};
