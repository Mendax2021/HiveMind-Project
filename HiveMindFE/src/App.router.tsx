import { createBrowserRouter, Navigate } from "react-router-dom";
import AppContainer from "./pages/AppContainer.tsx";
import SignIn from "./pages/Signin.tsx";
import App from "./App.tsx";
import SignUp from "./pages/Signup.tsx";
import AuthGuard from "./shared/components/AuthGuard/AuthGuard.tsx";
import Home from "./pages/Home.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    /*
    Per fare in modo che io possa utilizzare l`hook useNavigate di reactRouterDom per passare il suo valore
    di ritorno a NextUIProvider come prop è necessario che App si trovi nel contesto di una rotta.
    Tutte le altre rotte saranno figlie di App (cioè la rotta radice) e saranno renderizzate all'interno di Outlet. 
    */
    children: [
      {
        path: "",
        element: (
          <AuthGuard isProtected>
            <AppContainer />
          </AuthGuard>
        ),
        children: [
          {
            path: "/",
            element: <Navigate to="/home" replace />,
          },
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/profile/:userId",
            element: <ProfilePage />,
          },
        ],
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
