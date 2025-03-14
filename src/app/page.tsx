"use client";
import { useState, useEffect } from "react";
import NameCareerForm from "./components/NameCareerForm";
import SubjectFrom from "./components/SubjectFrom";
import Schedule from "./components/Schedule";
import { User, Subject } from "./types";
import {
  saveUserToLocalStorage,
  loadUserFromLocalStorage,
  saveSubjectsToLocalStorage,
  loadSubjectFromLocalStorage,
  clearLocalStorage,
} from "@/app/utils/localStorage";

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
    console.log("Nuevas asignaturas:", newSubjects);
    setSubjects(newSubjects);
    saveSubjectsToLocalStorage(newSubjects);
  };

  // Limpiar datos del localStorage y del estado
  const handleClearData = () => {
    setUser(null);
    setSubjects([]);
    clearLocalStorage();
  };

  // Eliminar asignatura
  const handleDeleteSubject = (subjectDelete : Subject) => {
    const updatedSubjects = subjects.filter(
      (subject) => 
        subject.name !== subjectDelete.name ||
        subject.day !== subjectDelete.day ||
        subject.startTime !== subjectDelete.startTime ||
        subject.endTime !== subjectDelete.endTime
    )

    // Actualizar el estado y guardar en localStorage
    setSubjects(updatedSubjects);
    saveSubjectsToLocalStorage(updatedSubjects);
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Renderizado condicional */}
      {!user ? (
        <div className="w-full max-w-md mx-auto">
          <NameCareerForm onSave={handleSaveUser} />
        </div>
      ) : (
        <div className="w-full max-w-6xl mx-auto">
          {/* Encabezado con saludo y botón en móvil */}
          <div className="w-full mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-lg font-medium text-gray-700 text-center sm:text-left">
              Bienvenido, {user.name} ({user.career})
            </p>
            <button
              onClick={handleClearData}
              className="w-full sm:w-auto py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Borrar los datos
            </button>
          </div>

          {/* Contenedor principal para formulario y horario */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Formulario de asignaturas */}
            <div className="w-full md:w-1/2 lg:w-2/5">
              <SubjectFrom subjects={subjects} onSave={handleSaveSubject} />
            </div>

            {/* Lista de horarios */}
            <div className="w-full md:w-1/2 lg:w-3/5">
              <Schedule subjects={subjects} onDelete={handleDeleteSubject} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
