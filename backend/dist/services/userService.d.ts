interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
}
export declare class UserService {
    register(user: User): Promise<any>;
    login(email: string, password: string): Promise<{
        token: string;
    }>;
    getAllUsers(): Promise<any[]>;
    updateUser(id: number, data: any): Promise<any>;
    deleteUser(id: number): Promise<any>;
}
export {};
