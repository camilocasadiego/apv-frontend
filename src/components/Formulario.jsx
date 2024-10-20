import { useEffect, useState } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id, setId] = useState('');
    
    const {guardarPaciente, paciente} = usePacientes();

    const [alerta, setAlerta] = useState({});
    const {msg} = alerta;

    useEffect(() => {
        if(paciente?.nombre){
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
            setId(paciente._id);
        }
    }, [paciente])
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(![nombre, propietario, email, fecha, sintomas].includes('')){
            setAlerta({})
            guardarPaciente({nombre, propietario, email, fecha, sintomas, id})
            
            setAlerta({
                msg: 'Guardado correctamente',
            });

            setNombre('');
            setPropietario('');
            setEmail('');
            setFecha('');
            setSintomas('');
            setId('');
        }else{
            setAlerta({
                msg: 'Debes rellenar todos los campos',
                error: true
            });
        }
    }
    return ( 
        <>
            <p className="text-lg text-center mb-10">Añade tus pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            {msg && <Alerta alerta={alerta}/>}
            
            <form onSubmit={handleSubmit} className="ml-4">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <input 
                            type="text" 
                            id="nombre"
                            value={nombre}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={e => setNombre(e.target.value)}                         

                        />
                    </div>

                    <div>
                        <label htmlFor="propietario" className="block text-sm font-medium text-gray-700 mb-1">Propietario</label>
                        <input 
                            type="text" 
                            id="propietario"
                            value={propietario}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={e => setPropietario(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                        <input 
                            type="email" 
                            id="email"
                            value={email}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                        <input 
                            type="date" 
                            id="fecha"
                            value={fecha}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={e => setFecha(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="sintomas" className="block text-sm font-medium text-gray-700 mb-1">Síntomas</label>
                        <textarea 
                            id="sintomas"
                            rows="3"
                            value={sintomas}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={e => setSintomas(e.target.value)}
                        ></textarea>
                    </div>

                    <input 
                        type="submit"
                        className="uppercase font-bold w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300"
                        value={id ? 'Guardar Cambios' : 'Agregar Paciente'}
                    >
                    </input>
                </div>
            </form>
        </>
     );
}
 
export default Formulario;