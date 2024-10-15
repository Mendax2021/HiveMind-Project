import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../shared/context/UserContext";
import Profile from "../shared/components/Profile/Profile";
import { Spinner } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { User } from "../shared/models/User.model";
import { getUserData } from "../services/UserService";
import { jwtDecode } from "jwt-decode";
import { JWTPayload } from "../shared/models/JWTPayload.model";

export default function ProfilePage() {
  const [userDataProfile, setUserDataProfile] = useState<User | null>(null);

  const userContext = useContext(UserContext);

  const { userId } = useParams();

  const fetchUserData = useCallback(() => {
    if (!userId || !userContext) return;
    const userIdNumber = parseInt(userId);

    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode<JWTPayload>(token);
      if (userIdNumber == decodedToken.user.id) {
        setUserDataProfile(userContext.user);
      } else {
        getUserData(userIdNumber).then((response) => setUserDataProfile(response.data));
      }
    }
  }, [userId, userContext]);

  useEffect(fetchUserData, [fetchUserData]);

  return <>{userDataProfile ? <Profile userData={userDataProfile} /> : <Spinner size="lg" />}</>;
}
