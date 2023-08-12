import { DepartmentCard } from "../../components";
import { useInventory } from "../../contexts/InventoryContext";

export function Departments() {
  const { departments } = useInventory();

  return (
    <div>
      <div className="flex gap-4">
        {departments.map((department) => {
          return <DepartmentCard department={department} key={department} />;
        })}
      </div>
    </div>
  );
}
