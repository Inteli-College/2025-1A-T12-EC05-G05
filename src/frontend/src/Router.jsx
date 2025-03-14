import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage.jsx";
import LoginPage from "./pages/login.jsx";
import RegisterPage from "./pages/registerPage.jsx";
import NotFound from "./pages/notFound.jsx";
import PrivateRoute from "./components/privateRoute.jsx";
import FitaMedicamentos from "./pages/fitaMedicamentos.jsx";
import Historico from "./pages/historico.jsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tela-medicamentos" element={<FitaMedicamentos />} />
        <Route path="/historico" element={<Historico/>} />
        
        {/* Rotas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Rota para não encontrado */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
