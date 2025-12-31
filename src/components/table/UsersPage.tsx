import { useState } from "react";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import type { CrudColumn } from "../HOC/ReusableDataTable/ReusableDataTable";
import ReusableCrudTable from "../HOC/ReusableDataTable/ReusableDataTable";
import type { Product } from "./Product";
import {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductsMutation,
} from "./ProductApi";
import ProductForm from "./ProductForm";
import { useDebouncedValue } from "../customHooks/useDebouncedValue";

const ProductsPage = () => {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const debouncedFilter = useDebouncedValue(globalFilter, 500);
  const { data, isLoading, isError } = useGetProductsQuery({
    page: page + 1, // backend usually 1-based
    limit: rows,
    search: debouncedFilter,
  });

  // const [triggerSearch, { data: searchData , isFetching}] = useLazySearchProductsQuery();

  const loading = isLoading;

  const handleGlobalFilterChange = (value: string) => {
    setGlobalFilter(value);
    setPage(0);
  };

  const onPageChange = (event: any) => {
    setPage(event.page);
    setRows(event.rows);
  };

  const resolvedData = data?.products ?? [];

  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProducts] = useDeleteProductsMutation();

  const handleSubmitProduct = async (formData: any) => {
    try {
      if (editingProduct) {
        await updateProduct({
          id: editingProduct.id,
          ...formData,
        }).unwrap();
      } else {
        await addProduct(formData).unwrap();
      }

      setShowModal(false);
      setEditingProduct(null);
    } catch (err) {
      console.error("Save failed", err);
    }
  };
  const totalRecords = data?.total ?? 0;

  /* =========================
     TABLE COLUMNS
  ========================== */
  const columns: CrudColumn<Product>[] = [
    { selectionMode: "multiple", exportable: false },
    { field: "title", header: "Product Name", sortable: true },
    { field: "brand", header: "Brand", sortable: true },
    { field: "category", header: "Category", sortable: true },
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
    {
      header: "Actions",
      exportable: false,
      body: (row) => (
        <div className="flex gap-2">
          <Button
            rounded
            outlined
            severity="info"
            onClick={() => {
              setEditingProduct(row);
              setShowModal(true);
            }}
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
        data={resolvedData}
        columns={columns}
        totalRecords={totalRecords}
        dataKey="id"
        selection={selectedProducts}
        onSelectionChange={setSelectedProducts}
        onDeleteSelected={() =>
          deleteProducts(selectedProducts.map((p) => p.id))
        }
        globalFilter={globalFilter}
        onGlobalFilterChange={handleGlobalFilterChange}
        onAdd={() => {
          setEditingProduct(null);
          setShowModal(true);
        }}
        page={page}
        rows={rows}
        onPageChange={onPageChange}
        loading={loading}
        lazy
      />

      <Dialog
        header={editingProduct ? "Edit Product" : "Add Product"}
        visible={showModal}
        style={{ width: "40vw" }}
        modal
        onHide={() => {
          setShowModal(false);
          setEditingProduct(null);
        }}
      >
        <ProductForm
          initialValues={editingProduct}
          onSubmit={handleSubmitProduct}
          onCancel={() => setShowModal(false)}
        />
      </Dialog>
    </>
  );
};

export default ProductsPage;
