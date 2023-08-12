export function InventoryLevelCard({ data: { type, level, state } }) {
  return (
    <div className="bg-gray-200 min-w-[15%] flex flex-col items-center justify-center p-4 rounded-lg">
      <h2
        className={`${state === "good" && "text-green-500"} ${
          state === "fine" && "text-orange-400"
        } ${state === "bad" && "text-red-500"}`}
      >
        {level}
      </h2>
      <p className="font-semibold">{type}</p>
    </div>
  );
}
