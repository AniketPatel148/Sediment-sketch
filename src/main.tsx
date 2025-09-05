import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

import AuthPage from "./pages/AuthPage";
import Landing from "./pages/Landing";
import EditorPage from "./pages/EditorPage";
import Protected from "./routes/Protected";

function Shell() {
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  return (
    <RoutesOutlet imageSrc={imageSrc} setImageSrc={setImageSrc} />
  );
}

function RoutesOutlet({ imageSrc, setImageSrc }: any) {
  return <Outlet context={{ imageSrc, setImageSrc }} />;
}

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <Shell />
      </AuthProvider>
    ),
    children: [
      { path: "/", element: <AuthPage /> },           // default to /auth if you prefer
      { path: "/auth", element: <AuthPage /> },
      {
        element: <Protected />,                        // everything below requires auth
        children: [
          { path: "/start", element: <Landing /> },
          { path: "/editor", element: <EditorPage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
