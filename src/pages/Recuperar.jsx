import { Link } from "react-router-dom";
import { useState } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const Recuperar = () => {

    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {        
        e.preventDefault();

     
        try {
            const url = '/veterinarios/recuperar'
            const {data} = await clienteAxios.post(url, { email });
            setAlerta({msg: data.msg, error: false})
            setEmail('')
        } catch (error) {
            setAlerta({msg: error.response.data.msg, error: true})
        }
      
    }   

    const {msg} = alerta
    return ( 
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">
                    Recupera tu cuenta y no pierdas tus  {""} 
                    <span className="text-black"> Pacientes</span>
                </h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {/* ALERTA */}
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
                    
                    <input 
                        type="submit"
                        value="Restablecer contraseña"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
                    />

                </form> 

                <nav className='mt-10 lg:flex lg:justify-between'>
                    <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes cuenta? Inicia sesión</Link>
                    <Link className="block text-center my-5 text-gray-500" to="/registrar">¡Únete a nosotros y crea tu cuenta!</Link>
                </nav>
            </div>
        </>
     );
}
 
export default Recuperar;