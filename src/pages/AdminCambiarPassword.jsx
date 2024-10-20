import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const AdminCambiarPassword = () => {


    const [passwordActual, setPasswordActual] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');

    const [alerta, setAlerta] = useState({});

    const {auth} = useAuth();

    const handleSubmit = async e => {
        e.preventDefault()

        const {email} = auth

        if(![passwordActual, password, repetirPassword].includes('')){
            if(password.length >= 8){
                if(password === repetirPassword){
                    try {
                        const url = `veterinarios/cambiar-password`
                        const respuesta = await clienteAxios.post(url, { email, passwordActual, password });
                        setPasswordActual('');
                        setPassword('')
                        setRepetirPassword('')
                        setAlerta({msg: respuesta.data.msg, error: false});
                    } catch (error) {
                        setAlerta({msg: error.response.data.msg, error: true})
                    }
                }else{
                    setAlerta({msg: 'Las contraseñas no son iguales', error: true});
                }
            }else{
                setAlerta({msg: 'La contraseña debe tener mínimo 8 caracteres', error: true});
            }
        }else{
            setAlerta({msg: 'Debes rellenar todos los campos', error: true});
        }
    }

    const { msg } = alerta

    return ( 
        <>
            <AdminNav/>
            <div className="mt-4">
                <h2 className="text-center text-black-600 font-black text-3xl">Cambiar Contraseña</h2>
                    <p className="font-bold text-center">Restablece tu <span className="text-indigo-600 text-centertext-black"> contraseña aquí</span></p>
            </div>

            <div className="flex items-center justify-center">
                <div className='mb-5 bg-white mt-5 md:mt-5 shadow-lg px-5 py-10 rounded-xl w-3/4 md:w-1/2'>
                {msg && <Alerta
                    alerta={alerta}
                />}
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Contraseña Actual
                        </label>
                        <input 
                            type="password"
                            placeholder="••••••••"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                            value={passwordActual ? passwordActual : ''}
                            onChange={e => setPasswordActual(e.target.value)}                        
                        />

                    </div>

                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Nueva Contraseña
                        </label>
                        <input 
                            type="password"
                            placeholder="••••••••"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                            value={password ? password : ''}
                            onChange={e => setPassword(e.target.value)}                        
                        />

                    </div>

                    <div className="my-5">
                        <label
                            className="uppercase text-gray-600 block text-xl font-bold"
                        >
                            Confirmar contraseña
                        </label>
                        <input 
                            type="password"
                            placeholder="••••••••"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                            value={repetirPassword ? repetirPassword : ''}
                            onChange={e => setRepetirPassword(e.target.value)}                        
                        />  
                    </div>
                    

                    <input 
                        type="submit"
                        value="Restablecer Contraseña"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
                    />

                </form>
            </div>
                
                {/* <nav className='mt-10 lg:flex lg:justify-between'>
                    {passwordCambiada && (
                        <Link className="block text-center my-5 text-gray-500" to="/">Iniciar sesión</Link>
                    )}  
                </nav> */}
            </div>
        </>
     );
}
 
export default AdminCambiarPassword;