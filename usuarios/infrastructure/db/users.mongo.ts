import { ObjectId } from "mongodb";
import { collections } from "../../../context/mongo.connector";
import User from "../../domain/User";
import UserRepository from "../../domain/user.repository";

export default class UserRepositoryMongoDB implements UserRepository {

    async registrarUser(user: User): Promise<User> {
        const result = await collections.users.insertOne(user);
        const id = String(result.insertedId);
        return await this.getUserById(id);
    }

    async logIn(user: User): Promise<User> {
        const userServer = await collections.users.findOne({
            usuario: user.usuario,
            password: user.password
        });
        if(!userServer) throw new Error("Este usuario no se encuentra. Registrate para poder acceder");
        else{
            const user: User ={
                id: String(userServer._id),
                nombre: userServer.nombre,
                apellidos: userServer.apellidos,
                usuario: userServer.usuario,
                password: userServer.password,
                email: userServer.email,
                news: userServer.news,
                libros: userServer.libros
            };
            return user;
        }
    }

    async getUserById(id: string): Promise<User> {
        const idObject = new ObjectId(id);
        const userServer = await collections.users.findOne({_id: idObject});
        if(!userServer) throw new Error("Este usuario no se encuentra. Registrate para pode acceder");
        const user: User = {
            id: String(userServer._id),
            nombre: userServer.nombre,
            apellidos: userServer.apellidos,
            usuario: userServer.usuario,
            password: userServer.password,
            email: userServer.email,
            news: userServer.news,
            libros: userServer.libros
        };
        return user;
    }
}