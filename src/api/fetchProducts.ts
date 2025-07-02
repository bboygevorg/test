import { Product } from "../store/types";

export const fetchProductsAPI = async (): Promise<Product[]> => {
  const res = await fetch(
    "https://686429dd88359a373e97b05e.mockapi.io/products"
  );
  if (!res.ok) {
    throw new Error("Ошибка загрузки продуктов");
  }
  return res.json();
};
