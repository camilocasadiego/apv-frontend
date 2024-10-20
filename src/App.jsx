import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthLayout from './layout/AuthLayout';
import Login from './pages/Login';
import Registrar from './pages/Registrar';
import Recuperar from './pages/Recuperar';
import ConfirmarCuenta from './pages/ConfirmarCuenta';
import CambiarPassword from './pages/CambiarPassword';
import { AuthProvider } from './context/AuthProvider';
import RutaProtegida from './layout/RutaProtegida';
import AdministrarPacientes from './pages/AdministrarPacientes';
import { PacientesProvider } from './context/PacientesProvider';
import EditarPerfil from './pages/EditarPerfil';
import AdminCambiarPassword from './pages/AdminCambiarPassword';

function App() {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path='/' element={<AuthLayout/>}>
              <Route index element={<Login/>}/>
              <Route path='registrar' element={<Registrar/>}/>
              <Route path='recuperar-cuenta' element={<Recuperar/>}/>
              <Route path='confirmar/:token' element={<ConfirmarCuenta/>}/>
              <Route path='cambiar-password/:token' element={<CambiarPassword/>}/>
            </Route>

            <Route path="/admin" element={<RutaProtegida/>}>
              <Route index element={<AdministrarPacientes/>}/>
              <Route path='/admin/perfil' element={<EditarPerfil/>}/>
              <Route path='/admin/cambiar-password' element={<AdminCambiarPassword/>}/>
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
