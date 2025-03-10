import { Subject } from '../types';

export const isSubjectConflict = (newSubject: Subject, existingSubjects: Subject[]): boolean => {
  return existingSubjects.some((subject) => {
    // Verificar si es el mismo día
    if (subject.day !== newSubject.day) return false;

    // Convertir horas a minutos para facilitar la comparación
    const newStart = timeToMinutes(newSubject.startTime);
    const newEnd = timeToMinutes(newSubject.endTime);
    const existingStart = timeToMinutes(subject.startTime);
    const existingEnd = timeToMinutes(subject.endTime);

    // Verificar si hay superposición de horarios
    return (
      (newStart >= existingStart && newStart < existingEnd) || // Nueva asignatura empieza durante una existente
      (newEnd > existingStart && newEnd <= existingEnd) ||    // Nueva asignatura termina durante una existente
      (newStart <= existingStart && newEnd >= existingEnd)     // Nueva asignatura cubre completamente una existente
    );
  });
};

// Función auxiliar para convertir "HH:MM" a minutos
const timeToMinutes = (time: string | undefined): number => {
  if (!time || !/^\d{2}:\d{2}$/.test(time)) return 0; // Validar formato HH:MM

  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};