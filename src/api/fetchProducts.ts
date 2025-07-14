import { Product, ProductState } from "../store/types";

export const fetchProductsAPI = async ({
  search,
  sort,
  page,
}: ProductState["filter"]): Promise<{
  data: Product[];
  totalCount: number;
}> => {
  const res = await fetch(
    `http://localhost:5000/products?q=${search}&_sort=${sort}&_page=${page}&_limit=10`
  );
  if (!res.ok) {
    throw new Error("Ошибка загрузки продуктов");
  }
  const totalCount = Number(res.headers.get("x-total-count"));

  const data = await res.json();

  return { data, totalCount };
};
