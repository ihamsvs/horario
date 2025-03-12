'use client'
import { useState } from "react";
interface NameCareerFormProps {
    onSave: (user : {name: string, career: string}) => void;
}

const NameCareerForm: React.FC<NameCareerFormProps> = ({onSave}) => {
    const [name, setName] = useState('');
    const [career, setCareer] = useState('');

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        onSave({name, career});
    }

    return (
      <form
      onSubmit={handleSubmit}
      className="w-full max-w-[350px] mx-auto border-4 border-black bg-gradient-to-b from-white via-gray-100 to-gray-200 p-4 sm:p-6 shadow-[8px_8px_0_0_#000] transition-transform duration-500 ease-in-out transform hover:scale-105 hover:bg-gradient-to-b hover:from-gray-200 hover:to-white"
    >
      <h2 className="text-xl sm:text-2xl font-black uppercase leading-6 text-black mb-4 sm:mb-6 transition-all duration-500 ease-in-out transform hover:scale-105 hover:text-blue-800">
        Formulario de Registro
      </h2>

      {/* Name Input */}
      <div className="mb-3 sm:mb-4">
        <label htmlFor="name" className="block text-sm font-bold text-black uppercase mb-1 sm:mb-2">
          Nombre:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full px-2 sm:px-3 py-2 border-2 border-black bg-white text-gray-800 transition-all duration-500 ease-in-out focus:border-red-500 focus:outline-none"
        />
      </div>

      {/* Career Input */}
      <div className="mb-4 sm:mb-6">
        <label htmlFor="career" className="block text-sm font-bold text-black uppercase mb-1 sm:mb-2">
          Carrera:
        </label>
        <input
          type="text"
          id="career"
          value={career}
          onChange={(e) => setCareer(e.target.value)}
          className="block w-full px-2 sm:px-3 py-2 border-2 border-black bg-white text-gray-800 transition-all duration-500 ease-in-out focus:border-red-500 focus:outline-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full border-2 border-black bg-red-500 px-3 py-2 font-bold text-white transition-all duration-500 ease-in-out hover:bg-blue-700 hover:text-yellow-300 hover:shadow-[4px_4px_0_0_#000] transform hover:scale-105"
      >
        Guardar
      </button>

      <div className="mt-3 sm:mt-4 border-l-4 border-red-500 pl-2 sm:pl-4 text-xs sm:text-sm text-gray-800 transition-all duration-500 ease-in-out hover:border-blue-500 hover:text-gray-600">
        Complete todos los campos para registrarse en nuestro sistema.
      </div>
    </form>
    )

}

export default NameCareerForm;