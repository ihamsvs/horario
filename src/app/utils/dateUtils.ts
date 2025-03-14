export const getCurrentDay = () : string => {
    const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
    const today = new Date().getDay();
    return days[today];
}