import {useState} from 'react';
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";
import {  Link, useParams } from "react-router-dom";

const CambiarPassword = () => {
    
    const params = useParams();
    const { token } = params;

    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        setAlerta({});
        if(![password, repetirPassword].includes('')){
            if(password.length >= 8){
                if(password === repetirPassword){
                    try {
                        const url = `/veterinarios/recuperar/${token}`
                        const respuesta = await clienteAxios.post(url, { password });
                        setPassword('');
                        setRepetirPassword('');
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
            setAlerta({msg: 'Debe rellenar todos los campos', error: true});
        }
    }

    const { msg } = alerta
    return ( 
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Cambia tu contraseña y continua Administrando tus  {""} 
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
                            Contraseña
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
                
                <nav className='mt-5 lg:flex lg:justify-between'>
                    
                    <Link className="block text-center my-5 text-gray-500" to="/">Iniciar sesión</Link>
                     
                </nav>
            </div>
        </>
    );
}
 
export default CambiarPassword;