import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setAlerta({});

        if(![nombre, email, password, repetirPassword].includes('')){
            if(password.length >= 8){
                if(password === repetirPassword){
                    try {
                        const respuesta = await clienteAxios.post('/veterinarios', { nombre, email, password });
                        console.log(respuesta);
                        setNombre('')
                        setEmail('');
                        setAlerta({msg: 'Cuenta creada correctamente. Revisa tu correo para confirmar tu cuenta', error: false});
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
        
        setPassword('');
        setRepetirPassword('');

    }

    const { msg } = alerta
    return ( 
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Crea tu cuenta y Administra tus  {""} 
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
                            Nombre
                        </label>
                        <input 
                            type="text"
                            placeholder="Ingresa tu nombre"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}                         
                        />
                    </div>
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
                            value={repetirPassword}  
                            onChange={e => setRepetirPassword(e.target.value)}                      
                        />
                    </div>
                    

                    <input 
                        type="submit"
                        value="Crear Cuenta"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
                    />

                </form> 

                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes cuenta? Inicia sesión</Link>
                    <Link className="block text-center my-5 text-gray-500" to="/recuperar-cuenta">Restablece tu contraseña aquí</Link>
                </nav>
            </div>
        </>
     );
}
 
export default Registrar;