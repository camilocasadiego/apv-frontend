import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta";

const EditarPerfil = () => {

    const {auth, actualizarPerfil} = useAuth();

    const [perfil, setPerfil] = useState({});
    const [alerta, setAlerta] = useState({});


    const handleSubmit = async (e) => {
        e.preventDefault();

        const {nombre, email} = perfil;

        if([nombre, email].includes('')){
            setAlerta({
                msg: "El nombre y el correo son obligatorios",
                error: true

            })
        }else{
            const respuesta = await actualizarPerfil(perfil);
            setAlerta(respuesta)
        }
    }
    useEffect(() => {
        setPerfil(auth);
    }, [auth]);
    
    return ( 
        <>
            <AdminNav/>
            <div className="mt-4">
                <h2 className="text-center text-black-600 font-black text-3xl">Editar Perfil</h2>
                    <p className="font-bold text-center">Modifica tu <span className="text-indigo-600 text-centertext-black"> información aquí</span></p>
            </div>

            <div className="flex items-center justify-center">
                <div className='mb-5 bg-white mt-5 md:mt-5 shadow-lg px-5 py-10 rounded-xl w-3/4 md:w-1/2'>
                    {alerta.msg && <Alerta
                        alerta={alerta}
                        />}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label
                                className="uppercase text-gray-600 block text-xl font-bold"
                            >
                                Nombre
                            </label>
                            <input 
                                type="text"
                                name="nombre"
                                value={perfil.nombre || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"      
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
                                name="email"
                                value={perfil.email || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"  
                                />
                        </div>
                        <div className="my-5">
                            <label
                                className="uppercase text-gray-600 block text-xl font-bold"
                                >
                                Teléfono
                            </label>
                            <input 
                                type="text"
                                name="telefono"
                                value={perfil.telefono || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                
                                />
                        </div>
                        <div className="my-5">
                            <label
                                className="uppercase text-gray-600 block text-xl font-bold"
                            >
                                Sitio Web
                            </label>
                            <input 
                                type="text"
                                name="web"
                                value={perfil.web || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                
                                />
                        </div>
        
                        <input 
                            type="submit"
                            value="Guardar Cambios"
                            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
                            />


                    </form> 
                </div>
            </div>
        </>
     );
}
 
export default EditarPerfil;