export function logOut(navigateFn: (path: string) => void) {
  localStorage.removeItem("token");
  navigateFn("/signIn");
}
