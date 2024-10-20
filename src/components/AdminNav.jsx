import { Link } from "react-router-dom";

const AdminNav = () => {
    return ( 
        <nav className="flex gap-3 ml-3">
            <Link
                to="/admin/perfil"
                className="uppercase text-gray-400"
            >Perfil</Link>

            <Link
                to="/admin/cambiar-password"
                className="uppercase text-gray-400"
            >Cambiar Contraseña</Link>
        </nav>
        
     );
}
 
export default AdminNav;