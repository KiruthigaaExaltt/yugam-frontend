export interface Product {
  id: string;
  code: string;
  name: string;
  image: string;
  price: number;
  category: string;
  rating: number;
  inventoryStatus: "INSTOCK" | "LOWSTOCK" | "OUTOFSTOCK";
}
