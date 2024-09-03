import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

function App() {
  //passo il navigator per i Link al nextuiProvider
  const navigate = useNavigate();

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
