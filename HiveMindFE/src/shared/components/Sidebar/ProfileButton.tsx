import Icon from "../Icon.tsx";
import { Avatar } from "@nextui-org/react";
import PopUpMenu from "./PopUpMenu.tsx";
import { useCallback, useState } from "react";

export default function ProfileButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // TODO: ANDARE A LEGGERE DOC USECALLBACK.
  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <>
      <div
        onClick={toggleMenu}
        className="w-full rounded-2xl flex items-center font-bold text-large justify-evenly hover:bg-secondary"
      >
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="md" />
        <h3>EcoElettronico</h3>
        <div className="text-2xl">
          <Icon icon={`bi-gear`} />
        </div>
      </div>
      {isOpen && <PopUpMenu />}
    </>
  );
}
