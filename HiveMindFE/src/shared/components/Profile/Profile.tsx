import { User } from "../../models/User.model";
import { convertBase64ToFile } from "../../utils/file.utils";
import defaultImage from "../../../assets/defaultImage.png";
import "../../../index.css";
import { ChangeEvent, useCallback, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import MyAvatar from "./MyAvatar";
import { updateProfileImage } from "../../../services/UserService";
import toast from "react-hot-toast";
import Icon from "../Icon";
import { useDisclosure } from "@nextui-org/react";
import ConfirmProfileImageModal from "./ConfirmProfileImageModal";
import IdeasContainer from "../IdeasContainer";

export default function Profile(props: { userData: User }) {
  const userContext = useContext(UserContext);
  const { userId } = useParams();
  const userIdNumber = userId ? parseInt(userId) : null;
  const [inputFile, setInputFile] = useState<File>();

  //hook di nextUI per gestire la visibilità della modale
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onchange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inputElement = event.target.files?.[0];
      if (!inputElement) return;
      setInputFile(inputElement);
      onOpen();
    },
    [inputFile]
  );

  const submitChanges = () => {
    if (userIdNumber && inputFile) {
      updateProfileImage(userIdNumber, inputFile)
        .then((response) => {
          toast.custom(
            <div className="toaster-animation rounded-xl flex bg-success items-center p-2 gap-3">
              <div>
                <Icon className="text-2xl" icon="bi-check-circle" />
              </div>
              <div className="toaster-animation flex flex-col items-center">
                <p>Hai modificato l`immagine di profilo correttamente.</p>
              </div>
            </div>,
            { duration: 2000 }
          );
          userContext?.setUser(response.data);
        })
        .catch((error) => {
          toast.custom(
            <div className="toaster-animation rounded-xl flex bg-error items-center p-2 gap-3">
              <div>
                <Icon className="text-2xl" icon="bi-x-circle" />
              </div>
              <div className="toaster-animation flex flex-col items-center">
                <p>Non hai modificato l`immagine {`Error: {${error}}`}</p>
              </div>
            </div>,
            { duration: 2000 }
          );
        })
        .finally(() => {
          onOpenChange();
        });
    }
  };

  const isOwnProfile = userContext && userContext.user && userIdNumber ? userIdNumber === userContext.user.id : false;

  return (
    <>
      <div className="flex border-b-2 border-b-5c5c5c p-5 gap-10">
        {
          <>
            <input type="file" id="file" className="hidden" onChange={onchange} />
            <label htmlFor="file">
              <MyAvatar
                isBordered
                showEditIcon={isOwnProfile}
                color="secondary"
                src={
                  props.userData.profileImage
                    ? convertBase64ToFile(props.userData.profileImage, "profileImage")
                    : defaultImage
                }
                className="md:w-24 md:h-24 md:text-large w-16 h-16 text-medium"
              />
            </label>
          </>
        }

        <div className="flex flex-col justify-center gap-1">
          <h1 className="text-2xl font-bold">{props.userData.userName}</h1>
          <h2 className="text-sm font-semibold text-secondary">
            {`Iscritto dal: ${new Date(props.userData.registrationDate).toLocaleDateString("en-GB")}`}
          </h2>
        </div>
        <ConfirmProfileImageModal isOpen={isOpen} onOpenChange={onOpenChange} submitChanges={submitChanges} />
      </div>
      <IdeasContainer isUserProfile />
    </>
  );
}
