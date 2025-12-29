import { useState } from "react";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import type { CrudColumn } from "../HOC/ReusableDataTable/ReusableDataTable";
import ReusableCrudTable from "../HOC/ReusableDataTable/ReusableDataTable";
import type { Product } from "./Product";
import {
  useDeleteProductsMutation,
  useGetProductsQuery,
  useSearchProductsQuery,
} from "./ProductApi";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Dialog } from "primereact/dialog";
import { useAddProductMutation } from "./ProductApi";
import ProductForm from "./ProductForm";

/* ================================
   PAGE
================================ */

const ProductsPage = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

  /* ================================
     DATA
  ================================ */
  const { data, isLoading, isError } = useGetProductsQuery();

  const products = data?.products ?? [];

  console.log("Products123456:", products);

  const [addProduct] = useAddProductMutation();

  const { data: searchData } = useSearchProductsQuery(globalFilter, {
    skip: !globalFilter,
  });

  const searchedProducts: Product[] = searchData?.products ?? [];

  const tableData: Product[] = globalFilter ? searchedProducts : products;

  const [deleteProducts] = useDeleteProductsMutation();

  const handleDeleteSelected = () => {
    deleteProducts(selectedProducts.map((p) => p.id));
  };

  const handleAddProduct = () => {
    setShowModal(true);
  };

  const handleSubmitProduct = async (formData: any) => {
    try {
      await addProduct(formData).unwrap();
      setShowModal(false);
    } catch (error) {
      console.error("Failed to add product", error);
    }
  };

  const columns: CrudColumn<Product>[] = [
    { selectionMode: "multiple", exportable: false },

    {
      field: "title",
      header: "Product Name",
      sortable: true,
    },
    {
      field: "brand",
      header: "Brand",
      sortable: true,
    },
    {
      field: "category",
      header: "Category",
      sortable: true,
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
    {
      header: "Status",
      body: (row) => (
        <Tag
          value={row.availabilityStatus}
          severity={row.stock > 0 ? "success" : "danger"}
        />
      ),
    },

    // ✅ ACTION COLUMN (React Icons)
    {
      header: "Actions",
      exportable: false,
      body: (row) => (
        <div className="flex gap-2">
          <Button
            rounded
            outlined
            severity="info"
            onClick={() => console.log("Edit product:", row)}
          >
            <FiEdit size={16} />
          </Button>

          <Button
            rounded
            outlined
            severity="danger"
            onClick={() => deleteProducts([row.id])}
          >
            <FiTrash2 size={16} />
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Failed to load products</p>;

  return (
    <>
      <ReusableCrudTable<Product>
        title="Manage Products"
        onAdd={handleAddProduct}
        data={tableData}
        columns={columns}
        dataKey="id"
        selection={selectedProducts}
        onSelectionChange={setSelectedProducts}
        onDeleteSelected={handleDeleteSelected}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
      />

      {/* ================================
          MODAL FOR ADDING PRODUCT
      ================================ */}
      <Dialog
        header="Add New Product"
        visible={showModal}
        style={{ width: "40vw" }}
        onHide={() => setShowModal(false)}
        modal
      >
        <ProductForm
          onSubmit={handleSubmitProduct}
          onCancel={() => setShowModal(false)}
        />
      </Dialog>
    </>
  );
};

export default ProductsPage;
