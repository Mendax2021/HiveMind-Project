import { Button } from "@nextui-org/react";
import { menuItems } from "../../constants/menuItems";
import Icon from "../Icon";
import { useCallback } from "react";

export default function LogoutButton() {
  const handleClick = useCallback(() => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("storage"));
  }, [localStorage]);

  return (
    <Button onClick={handleClick} isIconOnly variant="light" radius="full">
      <Icon className="text-2xl" icon={`${menuItems[1].icon}`} />
    </Button>
  );
}
