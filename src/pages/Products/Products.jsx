import { Link, useNavigate } from "react-router-dom";
import { useInventory } from "../../contexts/InventoryContext";

export function Products() {
  const {
    inventory,
    departments,
    selectedDepartment,
    sortMethod,
    showLowStockItems,
    inventoryDispatch,
  } = useInventory();
  const navigate = useNavigate();

  const handleDepartmentChange = (e) => {
    inventoryDispatch({
      type: "SET_SELECTED_DEPARTMENT",
      payload: e.target.value,
    });
    localStorage.setItem(
      "filters",
      JSON.stringify({
        selectedDepartment: e.target.value,
        sortMethod: sortMethod,
        showLowStockItems: showLowStockItems,
      })
    );
  };

  const handleSortChange = (e) => {
    inventoryDispatch({
      type: "SET_SORT_METHOD",
      payload: e.target.value,
    });
    localStorage.setItem(
      "filters",
      JSON.stringify({
        selectedDepartment: selectedDepartment,
        sortMethod: e.target.value,
        showLowStockItems: showLowStockItems,
      })
    );
  };

  const handleShowLowStockItems = () => {
    inventoryDispatch({
      type: "SET_SHOW_LOW_STOCK_ITEMS",
      payload: !showLowStockItems,
    });
    localStorage.setItem(
      "filters",
      JSON.stringify({
        selectedDepartment: selectedDepartment,
        sortMethod: sortMethod,
        showLowStockItems: !showLowStockItems,
      })
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <nav className="flex items-center justify-between">
        <h2>Products</h2>

        <select
          className="border-2 border-gray-400 rounded-md cursor-pointer"
          value={selectedDepartment}
          onChange={handleDepartmentChange}
        >
          <option>All Departments</option>
          {departments.map((department) => {
            return <option key={department}>{department}</option>;
          })}
        </select>

        <label>
          <input
            onChange={handleShowLowStockItems}
            checked={showLowStockItems}
            type="checkbox"
          />
          Low Stock Items
        </label>

        <select
          value={sortMethod}
          onChange={handleSortChange}
          className="border-2 border-gray-400 rounded-md cursor-pointer"
        >
          <option>Name</option>
          <option>Price</option>
          <option>Stock</option>
        </select>

        <button
          onClick={() => navigate("/add-product")}
          className="bg-blue-500 text-white px-4 py-1 rounded-md hover:shadow-lg"
        >
          New
        </button>
      </nav>

      <table>
        <thead className="bg-gray-200 border-2 border-gray-300">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th className="max-w-[25vw]">Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Supplier</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id} className="border-2 border-gray-300">
              <td>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="max-w-[8rem] h-[8rem]"
                />
              </td>
              <td>
                <Link className="underline" to={`/product/${item.id}`}>
                  {item.name}
                </Link>
              </td>
              <td className="max-w-[25vw]">{item.description}</td>
              <td>${item.price}</td>
              <td>{item.stock}</td>
              <td>{item.supplier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
