import { SideNavigation } from "../SideNavigation/SideNavigation";

export function PageWrapper({ children }) {
  return (
    <div className="relative flex gap-4">
      <aside className="bg-gray-900 min-w-[15%] h-screen p-4 sticky top-0 left-0 bottom-0">
        <SideNavigation />
      </aside>

      <main className="grow p-4">{children}</main>
    </div>
  );
}
