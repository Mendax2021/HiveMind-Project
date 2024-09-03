import { Listbox, ListboxItem } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { menuConstants } from "../../../../shared/constants/MenuItems";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../../../shared/redux/actions/AuthActions/AuthActions";

export default function DesktopMenu() {
  const currentPath = useLocation();
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex flex-col justify-between flex-1">
        <div>
          <Listbox variant="shadow" color="primary" aria-label="Menu" hideSelectedIcon>
            {menuConstants.map((menuItem) => (
              <ListboxItem
                showDivider
                key={menuItem.key}
                href={menuItem.link}
                className={currentPath.pathname.includes(menuItem.link) ? "text-primary" : ""}
              >
                {menuItem.label}
              </ListboxItem>
            ))}
          </Listbox>
        </div>
        <div className="mb-4">
          <Listbox aria-label="others" variant="shadow">
            <ListboxItem
              key="logout"
              color="danger"
              className="text-danger"
              onPress={() => {
                localStorage.removeItem("jwt");
                dispatch(logoutAction());
              }}
            >
              Logout
            </ListboxItem>
          </Listbox>
        </div>
      </div>
    </>
  );
}
