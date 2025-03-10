'use client'

import { useState } from 'react';
import { Subject } from '../types';
import { isSubjectConflict } from '../utils/validateSubject';

interface SubjectFormProps {
  subjects: Subject[];
  onSave: (subject: Subject) => void;
}

const SubjectForm: React.FC<SubjectFormProps> = ({ subjects, onSave }) => {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [day, setDay] = useState('Lunes'); // Valor inicial del día
  const [error, setError] = useState('');

  // Días de la semana
  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newSubject: Subject = { name, startTime, endTime, day };

    // Validar si hay conflicto
    if (isSubjectConflict(newSubject, subjects)) {
      setError('Ya existe una asignatura en el mismo día y horario.');
      return;
    }

    // Limpiar el mensaje de error y guardar la asignatura
    setError('');
    onSave(newSubject);
    setName('');
    setStartTime('');
    setEndTime('');
    setDay('Lunes'); // Reiniciar el día a "Lunes"
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[400px] border-4 border-black bg-gradient-to-b from-white via-gray-100 to-gray-200 p-6 shadow-[8px_8px_0_0_#000] transition-transform duration-500 ease-in-out transform  hover:bg-gradient-to-b hover:from-gray-200 hover:to-white"
    >
      <h2 className="text-2xl font-black uppercase leading-6 text-black mb-6 transition-all duration-500 ease-in-out transform hover:scale-105 hover:text-blue-800">
        Horario de Clase
      </h2>

      {/* Nombre de la asignatura */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-bold text-black uppercase mb-2">
          Nombre de asignatura:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full px-3 py-2 border-2 border-black bg-white text-gray-800 transition-all duration-500 ease-in-out focus:border-red-500 focus:outline-none"
          required
        />
      </div>

      {/* Hora de entrada */}
      <div className="mb-4">
        <label htmlFor="startTime" className="block text-sm font-bold text-black uppercase mb-2">
          Hora de entrada:
        </label>
        <input
          type="time"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="block w-full px-3 py-2 border-2 border-black bg-white text-gray-800 transition-all duration-500 ease-in-out focus:border-red-500 focus:outline-none"
          required
        />
      </div>

      {/* Hora de salida */}
      <div className="mb-4">
        <label htmlFor="endTime" className="block text-sm font-bold text-black uppercase mb-2">
          Hora de salida:
        </label>
        <input
          type="time"
          id="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="block w-full px-3 py-2 border-2 border-black bg-white text-gray-800 transition-all duration-500 ease-in-out focus:border-red-500 focus:outline-none"
          required
        />
      </div>

      {/* Día */}
      <div className="mb-6">
        <label htmlFor="day" className="block text-sm font-bold text-black uppercase mb-2">
          Día:
        </label>
        <select
          id="day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="block w-full px-3 py-2 border-2 border-black bg-white text-gray-800 transition-all duration-500 ease-in-out focus:border-red-500 focus:outline-none appearance-none"
          required
        >
          {daysOfWeek.map((dayOption) => (
            <option key={dayOption} value={dayOption}>
              {dayOption}
            </option>
          ))}
        </select>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="mb-4 border-l-4 border-red-500 pl-4 text-sm font-bold text-red-500 transition-all duration-500 ease-in-out">
          {error}
        </div>
      )}

      {/* Botones */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 border-2 border-black bg-red-500 px-3 py-2 font-bold text-white transition-all duration-500 ease-in-out hover:bg-blue-700 hover:text-yellow-300 hover:shadow-[4px_4px_0_0_#000] transform hover:scale-105"
        >
          Guardar
        </button>

        <button
          type="button"
          onClick={() => {
            setName("")
            setStartTime("")
            setEndTime("")
            setDay("Lunes")
            setError("")
          }}
          className="flex-1 border-2 border-black bg-gray-200 px-3 py-2 font-bold text-black transition-all duration-500 ease-in-out hover:bg-gray-300 hover:shadow-[4px_4px_0_0_#000] transform hover:scale-105"
        >
          Limpiar
        </button>
      </div>

      <div className="mt-4 border-l-4 border-red-500 pl-4 text-sm text-gray-800 transition-all duration-500 ease-in-out hover:border-blue-500 hover:text-gray-600">
        Ingrese los detalles de la clase para agregarla a su horario.
      </div>
    </form>
  );
};

export default SubjectForm;