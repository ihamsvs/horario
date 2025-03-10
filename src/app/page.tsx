'use client'
import { useState, useEffect } from 'react';
import NameCareerForm from './components/NameCareerForm'
import SubjectFrom from './components/SubjectFrom';
import Schedule from './components/Schedule';
import { User, Subject } from './types';
import {
  saveUserToLocalStorage,
  loadUserFromLocalStorage,
  saveSubjectsToLocalStorage,
  loadSubjectFromLocalStorage,
  clearLocalStorage,
} from '@/app/utils/localStorage';

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  // Cargar datos desde localStorage al inicio
  useEffect(() => {
    const savedUser = loadUserFromLocalStorage();
    const savedSubjects = loadSubjectFromLocalStorage();
    if (savedUser) {
      setUser(savedUser);
    }
    if (savedSubjects.length > 0) {
      setSubjects(savedSubjects);
    }
  }, []);

  // Guardar usuario en localStorage y en el estado
  const handleSaveUser = (user: User) => {
    setUser(user);
    saveUserToLocalStorage(user);
  };

  // Guardar asignatura en localStorage y en el estado
  const handleSaveSubject = (subject: Subject) => {
    const newSubjects = [...subjects, subject];
    console.log('Nuevas asignaturas:', newSubjects); 
    setSubjects(newSubjects);
    saveSubjectsToLocalStorage(newSubjects);
  };

  // Limpiar datos del localStorage y del estado
  const handleClearData = () => {
    setUser(null);
    setSubjects([]);
    clearLocalStorage();
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen flex flex-col items-center">
    {/* Título */}
    {/* Aquí puedes agregar un título si lo deseas */}

    {/* Renderizado condicional */}
    {!user ? (
      <div className="max-w-md mx-auto">
        <NameCareerForm onSave={handleSaveUser} />
      </div>
    ) : (
      <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
  {/* Saludo al usuario */}
  <div className="w-full md:w-1/4 text-center md:text-left">
    <p className="text-lg font-medium text-gray-700">
      Bienvenido, {user.name} ({user.career})
    </p>
    <button
      onClick={handleClearData}
      className="w-full max-w-xs py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Borrar los datos
    </button>
  </div>

  {/* Formulario de asignaturas */}
  <div className="w-full md:w-1/3">
    <SubjectFrom subjects={subjects} onSave={handleSaveSubject} />
  </div>

  {/* Lista de horarios */}
  <div className="w-full md:w-1/3">
    <Schedule subjects={subjects} />
  </div>

  {/* Botón de reinicio */}
  <div className="w-full md:w-1/4 text-center">
    <button
      onClick={handleClearData}
      className="w-full max-w-xs py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Borrar los datos
    </button>
  </div>
</div>
    )}
  </div>
  );
};

export default Home;