import { createContext, useContext, useEffect, useReducer } from "react";
import {
  inventoryInitialState,
  inventoryReducer,
} from "../reducers/inventoryReducer";

const InventoryContext = createContext();

const existingInventory = JSON.parse(localStorage.getItem("inventory"));
const existingFilters = JSON.parse(localStorage.getItem("filters"));

export function InventoryProvider({ children }) {
  const [inventoryState, inventoryDispatch] = useReducer(
    inventoryReducer,
    inventoryInitialState
  );

  useEffect(() => {
    if (existingInventory) {
      console.log(existingInventory);
      inventoryDispatch({ type: "SET_INVENTORY", payload: existingInventory });
    }
    if (existingFilters) {
      inventoryDispatch({
        type: "SET_SELECTED_DEPARTMENT",
        payload: existingFilters.selectedDepartment,
      });
      inventoryDispatch({
        type: "SET_SORT_METHOD",
        payload: existingFilters.sortMethod,
      });
      inventoryDispatch({
        type: "SET_SHOW_LOW_STOCK_ITEMS",
        payload: existingFilters.showLowStockItems,
      });
    }
  }, []);

  const totalStock = inventoryState.inventory.reduce(
    (totalQty, currItem) => (totalQty += currItem.stock),
    0
  );

  const totalDelivered = inventoryState.inventory.reduce(
    (totalDelivered, currItem) => (totalDelivered += currItem.delivered),
    0
  );

  const lowStockItems = inventoryState.inventory.reduce(
    (totalItems, currItem) =>
      currItem.stock <= 10 ? (totalItems += 1) : totalItems,
    0
  );

  const inventoryAnalytics = [
    { type: "Total Stock", level: totalStock, state: "good" },
    { type: "Total Delivered", level: totalDelivered, state: "fine" },
    { type: "Low Stock Items", level: lowStockItems, state: "bad" },
  ];

  const applyFilters = (inventory) => {
    let filteredInventory = [...inventory];
    const selectedDepartment = inventoryState.selectedDepartment;
    const sortMethod = inventoryState.sortMethod;
    const showLowStockItems = inventoryState.showLowStockItems;

    if (!showLowStockItems) {
      filteredInventory = filteredInventory.filter(({ stock }) => stock > 10);
    }

    if (selectedDepartment) {
      if (selectedDepartment !== "All Departments") {
        filteredInventory = filteredInventory.filter(
          ({ department }) => department === selectedDepartment
        );
      }
    }

    if (sortMethod) {
      switch (sortMethod) {
        case "Name": {
          return filteredInventory.sort((a, b) => a.name.localeCompare(b.name));
        }
        case "Price": {
          return filteredInventory.sort((a, b) => a.price - b.price);
        }
        case "Stock": {
          return filteredInventory.sort((a, b) => a.stock - b.stock);
        }
        default:
          return filteredInventory;
      }
    }

    localStorage.setItem("inventory", JSON.stringify(filteredInventory));
    return filteredInventory;
  };

  const filteredInventory = applyFilters(inventoryState.inventory);

  const addToInventory = (item) => {
    const newId = inventoryState.inventory.slice(-1)[0].id + 1;
    const newItem = { id: newId, ...item };

    const updatedInventory = [...inventoryState.inventory, newItem];

    localStorage.setItem("inventory", JSON.stringify(updatedInventory));
    inventoryDispatch({ type: "SET_INVENTORY", payload: updatedInventory });
  };

  return (
    <InventoryContext.Provider
      value={{
        inventory: filteredInventory,
        departments: inventoryState.departments,
        selectedDepartment: inventoryState.selectedDepartment,
        sortMethod: inventoryState.sortMethod,
        showLowStockItems: inventoryState.showLowStockItems,
        inventoryDispatch,
        inventoryAnalytics,
        addToInventory,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export const useInventory = () => useContext(InventoryContext);
