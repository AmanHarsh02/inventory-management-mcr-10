import { useParams } from "react-router";
import { useInventory } from "../../contexts/InventoryContext";

export function IndividualProduct() {
  const { originalInventory } = useInventory();
  const { productId } = useParams();

  const selectedProduct = originalInventory.find(({ id }) => id === +productId);

  const {
    name,
    imageUrl,
    description,
    price,
    stock,
    supplier,
    department,
    sku,
    delivered,
  } = selectedProduct ?? "";

  return (
    <div className="flex flex-col gap-2">
      <h2>{name}</h2>

      <img src={imageUrl} alt={name} className="max-w-[40%]" />

      <p>
        <strong>Price:</strong> ${price}
      </p>
      <p>
        <strong>Stock:</strong> {stock}
      </p>
      <p>
        <strong>Supplier:</strong> {supplier}
      </p>
      <p>
        <strong>Department:</strong> {department}
      </p>
      <p>
        <strong>SKU:</strong> {sku}
      </p>
      <p>
        <strong>Delivered:</strong> {delivered}
      </p>
      <p>
        <strong>Description:</strong> ${description}
      </p>
    </div>
  );
}
