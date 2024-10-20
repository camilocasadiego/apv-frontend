const Footer = () => {
    return ( 
        <footer className="bg-gray-100 border-t border-gray-200">
            <div className="container mx-auto px-4 py-8 md:py-10">
                <p className="text-center text-sm md:text-base text-gray-600">
                    APV - Administrador de Pacientes de{" "}
                    <span className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-300">
                        Veterinaria
                    </span>
                </p>
                <p className="mt-2 text-center text-xs md:text-sm text-gray-500">
                    © {new Date().getFullYear()} Todos los derechos reservados
                </p>
            </div>
        </footer>
     );
}
 
export default Footer;