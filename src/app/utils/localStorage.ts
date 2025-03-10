import {User, Subject} from '../types';

const USER_KEY = 'user';
const SUBJECTS_KEY = 'subjects';

export const saveUserToLocalStorage = (user : User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export const loadUserFromLocalStorage = () : User | null => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null
}

export const saveSubjectsToLocalStorage = (subjects : Subject[]) => {
    localStorage.setItem(SUBJECTS_KEY, JSON.stringify(subjects));
}

export const loadSubjectFromLocalStorage = () : Subject[] => {
    const subjects = localStorage.getItem(SUBJECTS_KEY)
    return subjects ? JSON.parse(subjects) : []
}

export const clearLocalStorage = () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(SUBJECTS_KEY);
}