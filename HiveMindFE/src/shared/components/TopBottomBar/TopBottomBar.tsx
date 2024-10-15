import { sidebarMenuItems } from "../../constants/menuItems";
import Icon from "../Icon";
import logo from "../../../assets/Logo.png";
import { Avatar, Button } from "@nextui-org/react";
import { useCallback, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { convertBase64ToFile } from "../../utils/file.utils";
import defaultImage from "../../../assets/defaultImage.png";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import InfoButton from "./InfoButton";
import AddIdeasButton from "./AddIdeasButton";
import { SearchFilterContext } from "../../context/SearchFilterContext";

export default function TopBottomBar(props: { direction: "top" | "bottom"; addIdeas?: () => void }) {
  const userContext = useContext(UserContext);
  const searchTypeContext = useContext(SearchFilterContext);
  const currentPath = useLocation();
  const navigate = useNavigate();

  const handleClick = useCallback(
    (link: string) => {
      navigate(link);
    },
    [navigate]
  );

  return (
    <>
      {props.direction === "top" ? (
        <div className="z-50 bg-black sticky top-0 w-full flex lg:hidden items-center px-5 border-b-2 border-b-5c5c5c ">
          <LogoutButton />
          <div className=" flex justify-center w-full ">
            <img className="w-32" src={logo} alt="Logo" draggable="false" />
          </div>
          <InfoButton />
        </div>
      ) : (
        <div className=" lg:hidden z-50 sticky bottom-0 flex bg-black text-3xl bg-black p-2 items-center justify-around border-t-2 border-t-5c5c5c">
          {sidebarMenuItems.map((menuItem) => (
            <Button
              key={menuItem.key}
              onClick={() => {
                handleClick(`/home?type=${searchTypeContext?.filterType}`);
              }}
              className="text-3xl"
              isIconOnly
              variant="light"
              radius="full"
            >
              <Icon
                key={menuItem.key}
                icon={currentPath.pathname.includes(menuItem.link) ? `${menuItem.icon}-fill` : menuItem.icon}
              />
            </Button>
          ))}
          <AddIdeasButton />
          <Avatar
            onClick={() => {
              handleClick(`/profile/${userContext?.user?.id}?type=${searchTypeContext?.filterType}`);
            }}
            isBordered={currentPath.pathname.includes("profile")}
            color="secondary"
            src={
              userContext?.user?.profileImage
                ? convertBase64ToFile(userContext.user.profileImage, "profileImage")
                : defaultImage
            }
            size="sm"
          />
        </div>
      )}
    </>
  );
}
