type MenuItem = {
  label: string;
  icon: string;
  link: string;
  key: string;
};
//voci del menu della sidebar
export const sidebarMenuItems: MenuItem[] = [{ label: "Home", icon: "bi-house", link: "/home", key: "home" }];

//voci del PopUpMenu al click del ProfileButton
export const menuItems: MenuItem[] = [
  { label: "Profile", icon: "bi-person", link: "/profile", key: "profile" },
  { label: "Log out", icon: "bi-box-arrow-left", link: "/signIn", key: "logout" },
];
