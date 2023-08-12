import { NavLink } from "react-router-dom";

export function SideNavigation() {
  return (
    <div className="flex flex-col h-full justify-between gap-4">
      <div
        data-nav="side-nav"
        className=" grow flex flex-col gap-4 items-start"
      >
        <NavLink
          to="/"
          className={({ isActive }) => {
            const classes =
              "flex items-center gap-2 p-2 w-max text-xl font-medium";

            return isActive
              ? `${classes} text-white font-bold`
              : `${classes} text-gray-500  hover:text-white`;
          }}
        >
          <p className="">Dashboard</p>
        </NavLink>

        <NavLink
          to="/departments"
          className={({ isActive }) => {
            const classes =
              "flex items-center gap-2 p-2 w-max  text-xl font-medium";

            return isActive
              ? `${classes} text-white font-bold`
              : `${classes} text-gray-500  hover:text-white`;
          }}
        >
          <p className="">Departments</p>
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) => {
            const classes =
              "flex items-center gap-2 p-2 w-max  text-xl font-medium";

            return isActive
              ? `${classes} text-white font-bold`
              : `${classes} text-gray-500  hover:text-white`;
          }}
        >
          <p className="">Products</p>
        </NavLink>
      </div>
    </div>
  );
}
