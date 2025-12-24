import type { Product } from "../types/product";


export const ProductService = {
  async getProducts(): Promise<Product[]> {
    return Promise.resolve([
      {
        id: "1000",
        code: "P001",
        name: "Laptop",
        image: "laptop.png",
        price: 750,
        category: "Electronics",
        rating: 4,
        inventoryStatus: "INSTOCK",
      },
      {
        id: "1001",
        code: "P002",
        name: "Headphones",
        image: "headphones.png",
        price: 120,
        category: "Accessories",
        rating: 5,
        inventoryStatus: "LOWSTOCK",
      },
    ]);
  },
};
