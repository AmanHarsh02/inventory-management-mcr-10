import { inventoryData } from "../db/inventoryData";

export const inventoryInitialState = {
  inventory: inventoryData,
  departments: ["Kitchen", "Clothing", "Toys"],
  selectedDepartment: "",
  sortMethod: "",
  showLowStockItems: true,
};

export const inventoryReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_INVENTORY":
      return { ...state, inventory: payload };
    case "SET_SELECTED_DEPARTMENT":
      return { ...state, selectedDepartment: payload };
    case "SET_SORT_METHOD":
      return { ...state, sortMethod: payload };
    case "SET_SHOW_LOW_STOCK_ITEMS":
      return { ...state, showLowStockItems: payload };
    default:
      return { ...state };
  }
};
