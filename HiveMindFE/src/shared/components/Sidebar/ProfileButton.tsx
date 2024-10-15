import Icon from "../Icon.tsx";
import { Avatar } from "@nextui-org/react";
import PopUpMenu from "./PopUpMenu.tsx";
import { useCallback, useContext, useState } from "react";
import style from "./profileButton.module.css";
import { UserContext } from "../../context/UserContext.ts";
import { convertBase64ToFile } from "../../utils/file.utils.ts";
import defaultImage from "../../../assets/defaultImage.png";

export default function ProfileButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const userContext = useContext(UserContext);

  return (
    <>
      <div
        onClick={toggleMenu}
        className="w-full py-2 rounded-2xl flex items-center font-bold text-large justify-evenly hover:bg-secondary"
      >
        <div>
          <Avatar
            isBordered
            color="secondary"
            src={
              userContext?.user?.profileImage
                ? convertBase64ToFile(userContext.user.profileImage, "profileImage")
                : defaultImage
            }
            size="md"
          />
        </div>
        <h3>{userContext && userContext.user && userContext.user.userName}</h3>
        <div className={`text-2xl ${isOpen ? style.rotate : ""}`}>
          <Icon icon="bi-gear" />
        </div>
      </div>
      {isOpen && <PopUpMenu toggleMenu={toggleMenu} />}
    </>
  );
}
