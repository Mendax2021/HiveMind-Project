import { Card, Listbox, ListboxItem } from "@nextui-org/react";
import Icon from "../Icon.tsx";
import { menuItems } from "../../constants/menuItems.tsx";
import { useLocation } from "react-router-dom";
import { useCallback, useContext } from "react";
import { UserContext } from "../../context/UserContext.ts";
import { SearchFilterContext } from "../../context/SearchFilterContext.ts";

export default function ProfileButton(props: { toggleMenu: () => void }) {
  const currentPath = useLocation();
  const userContext = useContext(UserContext);
  const searchFilterTypeContext = useContext(SearchFilterContext);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage")); // aggiunta dell`evento per il logout
  }, [localStorage]);

  return (
    <Card className="absolute w-full flex items-center justify-evenly bottom-10 opacity-90 bg-black border-2 border-5c5c5c shadow-[0_20px_30px_-15px_rgba(92,92,92,50)]">
      <div className="w-full">
        <Listbox variant="flat" aria-label="Menu">
          {menuItems.map((menuItem) =>
            menuItem.key !== "logout" ? (
              <ListboxItem
                key={menuItem.key}
                href={
                  userContext?.user
                    ? `${menuItem.link}/${userContext.user.id}?type=${searchFilterTypeContext?.filterType}`
                    : "#"
                }
                onClick={props.toggleMenu}
                textValue={menuItem.label}
                aria-label={menuItem.label}
              >
                <div className="flex text-xl">
                  <span className="ml-2 mr-5">
                    <Icon
                      icon={currentPath.pathname.includes(menuItem.link) ? `${menuItem.icon}-fill` : menuItem.icon}
                    />
                  </span>
                  <span>{menuItem.label}</span>
                </div>
              </ListboxItem>
            ) : (
              <ListboxItem
                key={menuItem.key}
                onClick={handleLogout}
                textValue={menuItem.label}
                aria-label={menuItem.label}
              >
                <div className="flex text-xl text-danger">
                  <span className="ml-2 mr-5">
                    <Icon
                      icon={currentPath.pathname.includes(menuItem.link) ? `${menuItem.icon}-fill` : menuItem.icon}
                    />
                  </span>
                  <span>{menuItem.label}</span>
                </div>
              </ListboxItem>
            )
          )}
        </Listbox>
      </div>
    </Card>
  );
}
