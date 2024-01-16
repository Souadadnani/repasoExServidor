import User from "./User";

export default interface UserRepository {
    registrarUser(user: User): Promise<User>;
    logIn(user: User): Promise<User>;
    getUserById(id: string): Promise<User>;
}