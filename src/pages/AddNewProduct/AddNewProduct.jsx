import { useState } from "react";
import { useInventory } from "../../contexts/InventoryContext";
import { useNavigate } from "react-router";

export function AddNewProduct() {
  const navigate = useNavigate();
  const { departments, addToInventory } = useInventory();
  const [state, setState] = useState({
    name: "",
    department: "",
    description: "",
    price: 0,
    stock: 0,
    sku: "",
    supplier: "",
    delivered: 0,
    imageUrl: "",
  });
  const [errorState, setErrorState] = useState(false);

  const handleAddProduct = () => {
    if (
      state.name.length <= 0 ||
      state.description.length <= 0 ||
      state.price <= 0 ||
      state.stock <= 0 ||
      state.sku.length <= 0 ||
      state.supplier.length <= 0 ||
      state.imageUrl.length <= 0
    ) {
      setErrorState(true);
    } else {
      setErrorState(false);
      addToInventory(state);
      navigate("/products");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h2>Add New Product</h2>

      <label>
        <p>Department:</p>

        <select
          onChange={(e) => setState({ ...state, department: e.target.value })}
          className="border-2 border-gray-200 rounded-sm w-[25%] cursor-pointer p-1 px-2 outline-none"
        >
          <option>Select Department</option>
          {departments.map((department) => {
            return <option key={department}>{department}</option>;
          })}
        </select>
      </label>

      <label>
        <p>Name:</p>

        <input
          onChange={(e) => setState({ ...state, name: e.target.value })}
          type="text"
          className="border-2 border-gray-200 rounded-sm w-[25%] p-1 px-2 outline-none"
        />
      </label>

      <label>
        <p>Description:</p>

        <input
          onChange={(e) => setState({ ...state, description: e.target.value })}
          type="text"
          className="border-2 border-gray-200 rounded-sm w-[25%] p-1 px-2 outline-none"
        />
      </label>

      <label>
        <p>Price:</p>

        <input
          onChange={(e) => setState({ ...state, price: +e.target.value })}
          type="number"
          defaultValue={0}
          className="border-2 border-gray-200 rounded-sm w-[25%] p-1 px-2 outline-none"
        />
      </label>

      <label>
        <p>Stock:</p>

        <input
          onChange={(e) => setState({ ...state, stock: +e.target.value })}
          type="number"
          defaultValue={0}
          className="border-2 border-gray-200 rounded-sm w-[25%] p-1 px-2 outline-none"
        />
      </label>

      <label>
        <p>SKU:</p>

        <input
          onChange={(e) => setState({ ...state, sku: e.target.value })}
          type="text"
          className="border-2 border-gray-200 rounded-sm w-[25%] p-1 px-2 outline-none"
        />
      </label>

      <label>
        <p>Supplier:</p>

        <input
          onChange={(e) => setState({ ...state, supplier: e.target.value })}
          type="text"
          className="border-2 border-gray-200 rounded-sm w-[25%] p-1 px-2 outline-none"
        />
      </label>

      <label>
        <p>Delivered:</p>

        <input
          type="number"
          value={0}
          disabled
          className="border-2 border-gray-200 rounded-sm w-[25%] cursor-not-allowed p-1 px-2 outline-none"
        />
      </label>

      <label>
        <p>Image URL:</p>

        <input
          onChange={(e) => setState({ ...state, imageUrl: e.target.value })}
          type="text"
          className="border-2 border-gray-200 rounded-sm w-[25%] p-1 px-2 outline-none"
        />
      </label>

      {errorState && (
        <p className="text-red-600">* Please fill out the form correctly!</p>
      )}

      <button
        onClick={handleAddProduct}
        className="bg-blue-500 text-white w-max px-4 py-2 mt-4 rounded-lg"
      >
        Add Product
      </button>
    </div>
  );
}
