export function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener("storage", listener);
  };
}

export function getToken() {
  return localStorage.getItem("token");
}
