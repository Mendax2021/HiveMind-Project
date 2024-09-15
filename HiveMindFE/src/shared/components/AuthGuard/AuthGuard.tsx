import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function AuthGuard(props: { children: ReactNode; isProtected?: boolean }) {
  const token = localStorage.getItem("token");

  if (props.isProtected) {
    //replace mi permette di evitare che l'utente possa tornare indietro con il tasto back
    // e ritrovarsi nella pagina stessa (effettua un replace sullo stack della history)
    return token ? props.children : <Navigate to="/signIn" replace />;
  }

  return !token ? props.children : <Navigate to="/home" replace />;
}
