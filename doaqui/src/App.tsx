import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarIndex from './components/statics/navbarIndex/NavbarIndex';
import Home from "./pages/home/Home"
import CadastroUsuario from "./pages/cadastroUsuario/CadastroUsuario"
import './App.css';
import CadastroDoacoes from './pages/cadastroDoacoes/CadastroDoacoes';
import Login from './pages/login/Login';
import Doacoes from './pages/doacoes/Doacoes';


function App() {
  return (
    <main id='app'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/cadastro-usuario' element={<CadastroUsuario />} />
          <Route path='/fazer-doacao' element={<CadastroDoacoes />} />
          <Route path='/login' element={<Login />} />
          <Route path='/doacoes' element={<Doacoes />} />
        </Routes>
      </Router>
      
    </main>
  );
}

export default App;