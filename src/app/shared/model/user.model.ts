export interface userModel {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    department: string;
    remarks: string;
    id: number | string;
    operation?: string;
}