
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./routes/Login";
import Cadastro from "./routes/Cadastro";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redireciona a raiz para /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Páginas */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}
  
export default App
