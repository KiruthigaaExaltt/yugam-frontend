import { useEffect, useState } from "react";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import type { CrudColumn } from "./HOC/ReusableDataTable/ReusableDataTable";
import ReusableCrudTable from "./HOC/ReusableDataTable/ReusableDataTable";
import { ProductService } from "./ProductService";

/* ================================
   TYPE
================================ */
interface Product {
  id: string;
  code: string;
  name: string;
  image: string;
  price: number;
  category: string;
  rating: number;
  inventoryStatus: string;
}

/* ================================
   PAGE
================================ */
const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    ProductService.getProducts().then(setProducts);
  }, []);

  const columns: CrudColumn<Product>[] = [
    // { selectionMode: "multiple", exportable: false },

    { field: "code", header: "Code", sortable: true },
    { field: "name", header: "Name", sortable: true },

    {
      header: "Image",
      body: (row) => (
        <img
          src={`https://primefaces.org/cdn/primereact/images/product/${row.image}`}
          alt={row.name}
          width={60}
        />
      ),
    },

    {
      field: "price",
      header: "Price",
      sortable: true,
      body: (row) =>
        row.price.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
    },

    { field: "category", header: "Category", sortable: true },

    {
      header: "Reviews",
      body: (row) => <Rating value={row.rating} readOnly cancel={false} />,
    },

    {
      header: "Status",
      body: (row) => (
        <Tag
          value={row.inventoryStatus}
          severity={
            row.inventoryStatus === "INSTOCK"
              ? "success"
              : row.inventoryStatus === "LOWSTOCK"
              ? "warning"
              : "danger"
          }
        />
      ),
    },

    {
      header: "Actions",
      exportable: false,
      body: () => (
        <>
          <Button icon="pi pi-pencil" rounded outlined className="mr-2" />
          <Button icon="pi pi-trash" rounded outlined severity="danger" />
        </>
      ),
    },
  ];

  return (
    <ReusableCrudTable<Product>
      title="Manage Products"
      data={products}
      columns={columns}
      dataKey="id"
      selection={selectedProducts}
      onSelectionChange={setSelectedProducts}
      globalFilter={globalFilter}
      onGlobalFilterChange={setGlobalFilter}
    //   toolbar={true}
    //   onAdd={() => console.log("Add Product")}
    //   onDeleteSelected={() => console.log("Delete Selected")}
    //   onExport={true}
    />
  );
};

export default ProductsPage;
