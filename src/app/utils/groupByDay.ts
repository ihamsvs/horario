import { Subject } from '../types';

export const groupSubjectsByDay = (subjects: Subject[]): Record<string, Subject[]> => {
  return subjects.reduce((acc, subject) => {
    const day = subject.day.toLowerCase(); // Normaliza el día a minúsculas
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(subject);
    return acc;
  }, {} as Record<string, Subject[]>);
};