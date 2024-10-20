import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";
// import useAuth from "../hooks/useAuth";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const {setAuth} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setAlerta({});

        if(![email, password].includes('')){
            try {
                const {data} = await clienteAxios.post('/veterinarios/login', {email, password}); 
                localStorage.setItem('token', data.token)
                setAuth(data)
                setEmail('');
                navigate('/admin');
            } catch (error) {
                setAlerta({msg: error.response.data.msg, error: true})
            }
        }else{
            setAlerta({msg: "Debes ingresar tu correo y contraseña", error: true})
            
        }
        setPassword('');
    }

    const { msg } = alerta
    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Inicia Sesión y Administra tus  {""} 
                    <span className="text-black"> Pacientes</span>
                </h1>
            </div>


            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

                {msg && <Alerta
                    alerta={alerta}
                />}
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Correo
                        </label>
                        <input 
                            type="email"
                            placeholder="ejemplo@correo.com"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={e => setEmail(e.target.value)}                         
                        />
                    </div>
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Contraseña
                        </label>
                        <input 
                            type="password"
                            placeholder="••••••••"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"  
                            value={password}
                            onChange={e => setPassword(e.target.value)}                       
                        />
                    </div>

                    <input 
                        type="submit"
                        value="Iniciar Sesión"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
                    />

                </form> 

                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link className="block text-center my-5 text-gray-500" to="/registrar">¡Únete a nosotros y crea tu cuenta!</Link>
                    <Link className="block text-center my-5 text-gray-500" to="/recuperar-cuenta">Restablece tu contraseña aquí</Link>
                </nav>
            </div>

        </>
      );
}
 
export default Login;
