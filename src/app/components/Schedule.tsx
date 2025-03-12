import { Subject } from '../types';
import { groupSubjectsByDay } from '../utils/groupByDay';

interface ScheduleProps {
  subjects: Subject[];
}

const Schedule: React.FC<ScheduleProps> = ({ subjects }) => {
  console.log('Asignaturas recibidas en Schedule:', subjects); // Verifica en la consola

  // Agrupar asignaturas por día
  const groupedSubjects = groupSubjectsByDay(subjects);
  console.log('Asignaturas agrupadas:', groupedSubjects); // Verifica en la consola

  // Días de la semana para ordenar el calendario
  const daysOfWeek = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];

  return (
    <div className="w-full max-w-[600px] mx-auto border-4 border-black bg-gradient-to-b from-white via-gray-100 to-gray-200 p-4 sm:p-6 shadow-[8px_8px_0_0_#000] transition-transform duration-500 ease-in-out transform hover:bg-gradient-to-b hover:from-gray-200 hover:to-white">
  <h2 className="text-xl sm:text-2xl font-black uppercase leading-6 text-black mb-4 sm:mb-6 transition-all duration-500 ease-in-out transform hover:scale-105 hover:text-blue-800">
    Horario Semanal
  </h2>

  <div className="overflow-x-auto border-2 border-black">
    <table className="w-full min-w-[400px]">
      <thead>
        <tr className="border-b-2 border-black bg-red-500">
          <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm font-black text-white uppercase">Día</th>
          <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-xs sm:text-sm font-black text-white uppercase">Asignaturas</th>
        </tr>
      </thead>
      <tbody>
        {daysOfWeek.map((day, index) => (
          <tr
            key={day}
            className={`border-b-2 border-black hover:bg-gray-200 transition-all duration-500 ease-in-out ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
          >
            <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-bold text-black uppercase border-r-2 border-black">{day}</td>
            <td className="py-2 sm:py-3 px-2 sm:px-4">
              {groupedSubjects[day] ? (
                <ul className="space-y-1 sm:space-y-2">
                  {groupedSubjects[day].map((subject, index) => (
                    <li
                      key={index}
                      className="border-l-4 border-red-500 pl-2 sm:pl-3 py-1 transition-all duration-500 ease-in-out hover:border-blue-500 hover:transform hover:translate-x-1"
                    >
                      <span className="font-bold text-black text-xs sm:text-sm">{subject.name}</span>{" "}
                      <span className="text-gray-700 font-medium text-xs sm:text-sm">
                        ({subject.startTime} - {subject.endTime})
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs sm:text-sm font-medium text-gray-500 border-l-4 border-gray-300 pl-2 sm:pl-3 py-1">
                  No hay asignaturas
                </p>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div className="mt-3 sm:mt-4 border-l-4 border-red-500 pl-2 sm:pl-4 text-xs sm:text-sm text-gray-800 transition-all duration-500 ease-in-out hover:border-blue-500 hover:text-gray-600">
    Este es su horario semanal de clases. Utilice el formulario para agregar nuevas asignaturas.
  </div>
</div>
  );
};

export default Schedule;