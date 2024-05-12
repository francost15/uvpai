import { Link } from "react-router-dom";
import 'animate.css';

export const MainPage = () => {
  return (
    <div className="flex justify-center mt-12 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-12 flex flex-col lg:flex-row w-full max-w-4xl">
        <div className="flex flex-col items-center w-full lg:w-1/2 space-y-4">
          <h1 className="text-4xl lg:text-6xl font-bold text-center">ENGI AI</h1>
          <h2 className="text-xl lg:text-2xl font-sans text-center">
            Mejora tu productividad con nuestros asistentes. Libera el potencia de la IA
          </h2>
          <div className="mt-4"></div>
          <Link to="/asistentes">
            <button className=" animate__animated animate__heartBeat group relative h-12 w-48 overflow-hidden rounded-2xl bg-purple-600 text-lg font-bold text-white">
              Pruébalo!
              <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
            </button>
          </Link>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col items-center space-y-4 mt-10 lg:mt-0 ">
          <img src="src/assets/engilogo.png" alt="Logo de ENGI" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
}
