import { Outlet, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { logOut } from "./shared/utils/auth.utils";
import { jwtDecode } from "jwt-decode";

function App() {
  //passo il navigator per i Link al nextuiProvider
  const navigate = useNavigate();

  useEffect(() => {
    //effettuo la decodifica del token da local storage e sloggo se è scaduto
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        logOut(navigate);
      }
    }
  }, []);

  return (
    <main className="w-full min-h-screen dark text-foreground bg-background relative">
      <NextUIProvider navigate={navigate}>
        <Toaster />
        <Outlet />
      </NextUIProvider>
    </main>
  );
}

export default App;
