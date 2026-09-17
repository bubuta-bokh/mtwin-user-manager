export interface User {
    userId: string;
    fullUserName: string;
    firstName: string;
    patronymic: string;
    passport: string;
    lastName: string;
    gender: string;
    office: string;
    companyId: number;
    department: string;
    isAdmin: boolean;
    hasPermanentPassword: boolean;
}