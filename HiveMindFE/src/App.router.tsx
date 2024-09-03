import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Signin from "./pages/Signin.tsx";
import App from "./App.tsx";
import Signup from "./pages/Signup.tsx";

//const HomePage = LazyLoad(lazy(() => import("./App"))); come fare per importare componenti lazy

export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    /*
    Per fare in modo che io possa utilizzare l`hook useNavigate di reactRouterDom per passare il suo valore
    di ritorno a NextUIProvider come prop è necessario che App si trovi nel contesto di una rotta.
    Tutte le altre rotte saranno figlie di App (cioè la rotta radice) e saranno renderizzate all'interno di Outlet. 
    */
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);
