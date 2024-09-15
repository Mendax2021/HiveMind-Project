import { useEffect } from "react";
import Sidebar from "../shared/components/Sidebar/Sidebar";
import { UserContext } from "../shared/context/UserContext";
import { jwtDecode } from "jwt-decode";
import { getUserData } from "../services/UserService";
import { JWTPayload } from "../shared/models/JWTPayload.model";

export default function Home() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode<JWTPayload>(token);
      console.log(decodedToken);
      const userData = getUserData({ id: decodedToken.user.id });
    }
  }, [localStorage]);

  return (
    <UserContext.Provider value={null}>
      <Sidebar direction="left" />
      <Sidebar direction="right" />
    </UserContext.Provider>
  );
}
