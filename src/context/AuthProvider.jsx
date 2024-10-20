import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            if(token){
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                try {
                    const {data} = await clienteAxios('/veterinarios/perfil', config);
                    setAuth(data);
                } catch (error) {
                    console.log(error.response.data.msg);
                    setAuth({});
                }
                
                setCargando(false);
            }else{
                setCargando(false)
            }
        }
        autenticarUsuario();
    }, []);

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({})
    }

    const actualizarPerfil = async (datos) => {
        const token = localStorage.getItem('token');

        if(token){
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
    
            try {
                const {data} = await clienteAxios.put(`/veterinarios/perfil/${datos._id}`, datos, config);
                setAuth(data)
                return {
                    msg: "Datos actualizados correctamente",
                }
            } catch (error) {
                return {
                    msg: error.response.data.msg,
                    error: true
                }
            }
        }
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext