import usePacientes from "../hooks/usePacientes";

const Paciente = ({paciente}) => {

    const {_id, nombre, propietario, email, fecha, sintomas} = paciente;

    const {setEdicion, eliminarPaciente} = usePacientes();

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha);
        return new Intl.DateTimeFormat('es-ES', {dateStyle: 'long'}).format(nuevaFecha)
    }

    return ( 
        <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
            <p className="font-bold uppercase text-indigo-700 my-2">Nombre: {''}
              <span className="font-normal normal-case text-black">{nombre}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">Propietario: {''}
              <span className="font-normal normal-case text-black">{propietario}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">Correo: {''}
              <span className="font-normal normal-case text-black">{email}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">Fecha: {''}
              <span className="font-normal normal-case text-black">{fecha}</span>
            </p>
            <p className="font-bold uppercase text-indigo-700 my-2">Síntomas: {''}
              <span className="font-normal normal-case text-black">{sintomas}</span>
            </p>

            <div className="flex justify-between my-5">
                <button 
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold  rounded-lg"
                    type="button"
                    onClick={() => setEdicion(_id)}
                >Editar</button>
                <button 
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold  rounded-lg"
                    type="button"
                    onClick={() => eliminarPaciente(_id)}
                >Eliminar</button>
            </div>
        </div>
    );
}
 
export default Paciente;