import { InventoryLevelCard } from "../../components";
import { useInventory } from "../../contexts/InventoryContext";

export function Dashboard() {
  const { inventoryAnalytics } = useInventory();

  return (
    <div className="flex gap-4">
      {inventoryAnalytics.map((data) => {
        return <InventoryLevelCard data={data} key={data.type} />;
      })}
    </div>
  );
}
