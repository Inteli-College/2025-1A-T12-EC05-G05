import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// Importa lógicas de proteção de rotas
import ProtectedRoute from "./contexts/ProtectedRoute";
import {AuthProvider} from "./contexts/AuthContext";

// Importações das telas:
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transfers from "./pages/Transfers";
import NotFound from "./pages/NotFound";

// Importações das telas de ativos:
import AssetsList from "./pages/assets/AssetsList";
import AssetAdd from "./pages/assets/AssetAdd";
import AssetView from "./pages/assets/AssetView";

// Importações das telas de locais:
import PlacesList from "./pages/places/PlacesList";
import PlaceAdd from "./pages/places/PlaceAdd";
import PlaceView from "./pages/places/PlaceView";

// Importações das telas de dispositivos:
import DevicesList from "./pages/devices/DevicesList";
import DeviceAdd from "./pages/devices/DeviceAdd";
import DeviceView from "./pages/devices/DeviceView";

// Importações das telas de usuários:
import UsersList from "./pages/users/UsersList";
import UserAdd from "./pages/users/UserAdd";
import UserView from "./pages/users/UserView";

// Importações do layout persistente
import AppLayout from "./components/appLayout/AppLayout";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rotas públicas: */}
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />

          {/* Rotas protegidas: */}
          {/* Layout persistente (não necessita múltiplas renderizações da SideBar e da Header) */}
          <Route element={<AppLayout />}>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transferencias"
              element={
                <ProtectedRoute>
                  <Transfers />
                </ProtectedRoute>
              }
            />

            {/* Rotas relacionadas aos ativos */}
            <Route
              path="/ativos"
              element={
                <ProtectedRoute>
                  <AssetsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adicionar-ativo"
              element={
                <ProtectedRoute requiredRole={["admin", "manager"]}>
                  <AssetAdd />
                </ProtectedRoute>
              }
            />
            <Route
              path="/visualizar-ativo/:id"
              element={
                <ProtectedRoute>
                  <AssetView />
                </ProtectedRoute>
              }
            />

            {/* Rotas relacionadas aos locais */}
            <Route
              path="/locais"
              element={
                <ProtectedRoute>
                  <PlacesList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adicionar-local"
              element={
                <ProtectedRoute requiredRole={["admin"]}>
                  <PlaceAdd />
                </ProtectedRoute>
              }
            />
            <Route
              path="/visualizar-local/:id"
              element={
                <ProtectedRoute>
                  <PlaceView />
                </ProtectedRoute>
              }
            />

            {/* Rotas relacionadas aos dispositivos detectores */}
            <Route
              path="/dispositivos"
              element={
                <ProtectedRoute>
                  <DevicesList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adicionar-dispositivo"
              element={
                <ProtectedRoute requiredRole={["admin"]}>
                  <DeviceAdd />
                </ProtectedRoute>
              }
            />
            <Route
              path="/visualizar-dispositivo/:id"
              element={
                <ProtectedRoute>
                  <DeviceView />
                </ProtectedRoute>
              }
            />

            {/* Rotas relacionadas aos usuários */}
            <Route
              path="/usuarios"
              element={
                <ProtectedRoute requiredRole={["admin"]}>
                  <UsersList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adicionar-usuario"
              element={
                <ProtectedRoute requiredRole={["admin"]}>
                  <UserAdd />
                </ProtectedRoute>
              }
            />
            <Route
              path="/visualizar-usuario/:id"
              element={
                <ProtectedRoute requiredRole={["admin"]}>
                  <UserView />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
