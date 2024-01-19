import { ObjectId } from "mongodb";
import { collections } from "../../../context/mongo.connector";
import Libro from "../../domain/Libro";
import LibrosRepository from "../../domain/libro.repository";

export default class LibrosRepositoryMongoDB implements LibrosRepository{

    async getAll(): Promise<Libro[] | undefined> {

        const librosBD = await collections.libros.find().toArray();
        if(!librosBD) return undefined;
        const libros: Libro[] = librosBD.map((libroBD)=>{
            const libro: Libro ={
                id: String(libroBD._id),
                titulo: libroBD.titulo,
                autor: libroBD.autor,
                fechaDevolucion: libroBD.fechaDevolucion,
                idUser: libroBD.idUser
            };
            return libro;
        });
        return libros;  
    }

    async getLibro(id: string): Promise<Libro | undefined> {
        const objectId = new ObjectId(id);
        const libroBD =  await collections.libros.findOne({_id: objectId});
        if(!libroBD) return undefined;
        const libro: Libro = {
            id: String(libroBD._id),
            titulo: libroBD.titulo,
            autor: libroBD.autor,
            fechaDevolucion: libroBD.fechaDevolucion,
            idUser: libroBD.idUser
        };
        return libro;       
    }

    async guardarLibro(libro: Libro): Promise<Libro | undefined> {
        const nuevoLibro = await collections.libros.insertOne(libro);
        const id = String(nuevoLibro.insertedId);
        return await this.getLibro(id);
    }

    async updateLibro(libro: Libro): Promise<Libro | undefined> {
        
        throw new Error("Method not implemented.");
    }
    deleteLibro(is: string): Promise<Libro[] | undefined> {
        throw new Error("Method not implemented.");
    }

    

}