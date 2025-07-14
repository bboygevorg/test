export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  inStock: boolean;
}

export interface ProductState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  totalCount: number;
  filter: {
    search: string;
    sort: "name" | "price";
    page: number;
  };
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}
