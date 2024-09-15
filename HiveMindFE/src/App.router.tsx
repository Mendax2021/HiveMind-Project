import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.tsx";
import SignIn from "./pages/SignIn.tsx";
import App from "./App.tsx";
import SignUp from "./pages/SignUp.tsx";
import AuthGuard from "./shared/components/AuthGuard/AuthGuard.tsx";

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
        element: (
          <AuthGuard isProtected>
            <Home />
          </AuthGuard>
        ),
      },
      {
        path: "/signIn",
        element: (
          <AuthGuard>
            <SignIn />
          </AuthGuard>
        ),
      },
      {
        path: "/signUp",
        element: (
          <AuthGuard>
            <SignUp />
          </AuthGuard>
        ),
      },
    ],
  },
]);
