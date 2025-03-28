import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login.jsx";
import RegisterPage from "./pages/registerPage.jsx";
import NotFound from "./pages/notFound.jsx";
import PrivateRoute from "./components/privateRoute.jsx";
import Layout from "./Layout.jsx";
import FitaMedicamentos from "./pages/fitaMedicamentos.jsx";
import AFazer from "./pages/AFazer.jsx";
import EmProgresso from "./pages/EmProgresso.jsx";
import Prontas from "./pages/Prontas.jsx";
import Historico from "./pages/historico.jsx";
import Logs from "./pages/Logs.jsx";
import Inventario from "./pages/inventario.jsx";
import Devolucao from "./pages/Devolucao.jsx";
import PossivelDevolucao from "./pages/PossivelDevolucao.jsx";
import Devolvidas from "./pages/Devolvidas.jsx";
import Inventario from "./pages/inventario.jsx";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota de login, sem sidebar */}
        <Route path="/" element={<LoginPage />} />

        {/* Rota para não encontrado */}
        <Route path="*" element={<NotFound />} />

        {/* Rotas que terão o layout com sidebar */}
        <Route element={<Layout />}>
          {/* Rotas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/tela-medicamentos" element={<FitaMedicamentos />}>
              <Route path="a-fazer" element={<AFazer />} />
              <Route path="em-progresso" element={<EmProgresso />} />
              <Route path="prontas" element={<Prontas />} />
            </Route>
            <Route path="/historico" element={<Historico />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/inventario" element={<Inventario />} />
            {/* Rotas aninhadas para devolução */}
            <Route path="/devolucao" element={<Devolucao />}>
              <Route path="possivel-devolucao" element={<PossivelDevolucao />} />
              <Route path="devolvidas" element={<Devolvidas />} />
            </Route>

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
