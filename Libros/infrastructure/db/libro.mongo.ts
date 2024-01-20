import { ObjectId } from 'mongodb';
import { collections } from '../../../context/mongo.connector';
import Libro from '../../domain/Libro';
import LibrosRepository from '../../domain/libro.repository';

export default class LibrosRepositoryMongoDB implements LibrosRepository{

    async getLibrosDisponibles(): Promise<Libro[] | undefined> {
        const librosBD = await collections.libros.find({idUser: "0"}).toArray();
        if(!librosBD) return undefined;
        const libros: Libro[] = librosBD.map(libroBD=>{
            const libro: Libro = {
                id: String(libroBD._id),
                titulo: libroBD.titulo,
                autor: libroBD.autor,
                fechaDevolucion: new Date(libroBD.fechaDevolucion),
                idUser: libroBD.idUser
            };
            return libro;
        });
        return libros;
    }

    async getLibrosPrestados(): Promise<Libro[] | undefined> {
        const librosBD = await collections.libros.find({idUser: {$ne: "0"}}).toArray();
        if(!librosBD) return undefined;
        const libros: Libro[] = librosBD.map(libroBD=>{
            const libro: Libro = {
                id: String(libroBD._id),
                titulo: libroBD.titulo,
                autor: libroBD.autor,
                fechaDevolucion: new Date(libroBD.fechaDevolucion),
                idUser: libroBD.idUser
            };
            return libro;
        });
        return libros;
    }

    async getAll(): Promise<Libro[] | undefined> {
        const librosDB = await collections.libros.find().toArray();
        if(!librosDB) return undefined;
        const libros: Libro[] = librosDB.map((libroBD)=>{
            const libro: Libro = {
                id: String(libroBD._id),
                titulo: libroBD.titulo,
                autor: libroBD.autor,
                fechaDevolucion: new Date(libroBD.fechaDevolucion),
                idUser: libroBD.idUser
            };
            return libro;
        });
        return libros;
    }

    async getLibro(id: string): Promise<Libro | undefined> {
        const objectId = new ObjectId(id);
        const libroBD = await collections.libros.findOne({_id: objectId});
        if(!libroBD) return undefined;
        const libro: Libro = {
            id: String(libroBD._id),
            titulo: libroBD.titulo,
            autor: libroBD.autor,
            fechaDevolucion: new Date(libroBD.fechaDevolucion),
            idUser: libroBD.idUser
        };
        return libro;
    }

    async guardarLibro(libro: Libro): Promise<Libro | undefined> {
        const newLibro = await collections.libros.insertOne(libro);
        const idLibro = String(newLibro.insertedId);
        return await this.getLibro(idLibro);
    }

    async updateLibro(libro: Libro): Promise<Libro | undefined> {
        const objectId = new ObjectId(libro.id);
        const result = await collections.libros.updateOne(
            {_id: objectId}, 
            {$set: {idUser: libro.idUser, fechaDevolucion: libro.fechaDevolucion}}
        );
        if(libro.id && result.modifiedCount > 0 ){
            console.log("El libro se ha actualizado");
            return await this.getLibro(libro.id); 
        }else{
            throw new Error(`No se puede actualizar el libro con este id = ${libro.id}`);
        }        
    }

    async deleteLibro(id: string): Promise<Libro[] | undefined> {
        const objectId = new ObjectId(id);
        const result = await collections.libros.deleteOne({_id: objectId});
        return await this.getAll();
    }

}