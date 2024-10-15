import { ReactNode, useSyncExternalStore } from "react";
import { Navigate } from "react-router-dom";
import { getToken, subscribe } from "../../utils/storage.utils";

export default function AuthGuard(props: { children: ReactNode; isProtected?: boolean }) {
  /**
   * Hook che chiama la prima callback passando come parametro la seconda callback.
   * Mi serve per fare in modo che il componente si aggiorni ogni volta che viene lanciato l'evento "storage"
   * Ogni qualvolta viene lanciato l`evento "storage", viene scaturito l`event listener che esegue la funzione
   * getToken() e restituisce il token salvato nel localStorage, cambia il valore di token e viene fatto
   * dinuovo render del componente.
   */
  const token = useSyncExternalStore(subscribe, getToken);

  if (props.isProtected) {
    //replace mi permette di evitare che l'utente possa tornare indietro con il tasto back
    // e ritrovarsi nella pagina stessa (effettua un replace sullo stack della history)
    return token ? props.children : <Navigate to="/signIn" replace />;
  }

  return !token ? props.children : <Navigate to="/" replace />;
}
