import { Card, Listbox, ListboxItem } from "@nextui-org/react";
import Icon from "../Icon.tsx";
import { menuItems } from "../../constants/menuItems.tsx";
import { useLocation } from "react-router-dom";

export default function ProfileButton() {
  const currentPath = useLocation();
  return (
    //TODO: SISTEMARE L`OMBRA
    <Card className="absolute w-full flex items-center justify-evenly bottom-10 opacity-90 bg-black border-2 border-5c5c5c shadow-[0_20px_30px_-15px_rgba(92,92,92,50)]">
      <div className="w-full">
        <Listbox variant="flat" aria-label="Menu">
          {menuItems.map((menuItem) => (
            <ListboxItem key={menuItem.key} href={menuItem.link}>
              <div className="flex text-xl">
                <span className="ml-2 mr-5">
                  <Icon icon={currentPath.pathname.includes(menuItem.link) ? `${menuItem.icon}-fill` : menuItem.icon} />
                </span>
                <span>{menuItem.label}</span>
              </div>
            </ListboxItem>
          ))}
        </Listbox>
      </div>
    </Card>
  );
}
