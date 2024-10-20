import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState([]);

    const {auth} = useAuth();

    useEffect( () => {
        const obtenerPacientes = async() => {
            try {
                const token = localStorage.getItem('token');
                if(token){
                    const config = {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }

                    try {
                        const {data} = await clienteAxios('/pacientes', config);
                        setPacientes(data)
                    } catch (error) {
                        console.log(error.response.data.msg);          
                    }               
                }
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes();
    }, [auth])

    const guardarPaciente = async (paciente) => {
        
        
        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id){
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)                
                const pacientesActualizados = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState);
                setPacientes(pacientesActualizados);
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }else{
            try {
                const {data} = await clienteAxios.post('/pacientes', paciente, config);
                const {createdAt, updatedAt, __v, ...pacienteAlmacenado} = data
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }  
    }

    const setEdicion = async (id) => {
        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clienteAxios(`/pacientes/${id}`, config)
            const {createdAt, updatedAt, __v, ...pacienteEditar} = data
            setPaciente(pacienteEditar);
        } catch (error) {
            console.log(error)
        }
    }

    const eliminarPaciente = async (id) => {
        const confirmar = confirm('¿Deseas eliminar el paciente?');

        const token = localStorage.getItem('token');
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(confirmar){
            try {
                await clienteAxios.delete(`/pacientes/${id}`, config)
                const pacientesActualizados = pacientes.filter(pacienteState => pacienteState._id !== id);
                setPacientes(pacientesActualizados);
            } catch (error) {
                console.log(error)
            }
        }
    }

    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}

export {
    PacientesProvider
}
export default PacientesContext