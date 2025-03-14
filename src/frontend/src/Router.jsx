// src/Router.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage.jsx";
import LoginPage from "./pages/login.jsx";
import RegisterPage from "./pages/registerPage.jsx";
import NotFound from "./pages/notFound.jsx";
import PrivateRoute from "./components/privateRoute.jsx";
import Layout from "./Layout.jsx";
import FitaMedicamentos from "./pages/fitaMedicamentos.jsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota de login, sem sidebar */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rotas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Rota para não encontrado */}
        <Route path="*" element={<NotFound />} />
        
        {/* Rotas que terão o layout com sidebar */}
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tela-medicamentos" element={<FitaMedicamentos />} />

          
          {/* Rotas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
