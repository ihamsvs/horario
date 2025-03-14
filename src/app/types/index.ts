export interface User {
    name: string;
    career: string
}

export interface Subject {
    name: string;
    startTime: string;
    endTime: string;
    day: string;
}

export interface ScheduleProps {
    subjects: Subject[];
    onDelete: (subject: Subject) => void;
}