import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

const ListadoPacientes = () => {

    const { pacientes } = usePacientes();

    return ( 
        <>
            {pacientes.length ? 
            (
                <>
                    <h2 className="text-3xl font-bold text-center">Listado Pacientes</h2>
                    <p className="text-xl text-center mt-5 mb-10">Administra tus {''}<span className="font-bold text-indigo-600">Pacientes y Citas</span></p>
                    
                    {pacientes.map( paciente => (
                        <Paciente 
                            key={paciente._id}
                            paciente={paciente}
                        />
                    ))}
                </>
            ) 
            :
            (
                <>
                    <h2 className="text-3xl font-bold text-center">No tienes pacientes</h2>
                    <p className="text-xl text-center mt-5 mb-10">Añade pacientes y <span className="font-bold text-indigo-600">descúbrelos aquí</span></p>
                </>
            )
        }
        </>
    );
}
 
export default ListadoPacientes;