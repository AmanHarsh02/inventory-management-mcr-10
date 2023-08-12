import { useNavigate } from "react-router";
import { useInventory } from "../../contexts/InventoryContext";

export function DepartmentCard({ department }) {
  const { inventoryDispatch, selectedDepartment } = useInventory();
  const navigate = useNavigate();

  const clickHandler = () => {
    inventoryDispatch({ type: "SET_SELECTED_DEPARTMENT", payload: department });
    navigate("/products");
  };

  return (
    <div
      onClick={clickHandler}
      className="bg-gray-200 min-w-[15%] min-h-[80px] flex items-center justify-center p-4 rounded-lg cursor-pointer hover:shadow-lg"
    >
      <h3>{department}</h3>
    </div>
  );
}
