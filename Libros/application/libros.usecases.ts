import Libro from "../domain/Libro";
import LibrosRepository from "../domain/libro.repository";

export default class LibrosUsesCases {
    private librosRepository: LibrosRepository;
    constructor(librosRepository: LibrosRepository){
        this.librosRepository = librosRepository;
    }

    async getAll(){
        return this.librosRepository.getAll();
    }

    async devolverLibro(id: string){
        try {
            const libroDevuelto = await this.librosRepository.getLibro(id);
            if(libroDevuelto){
                libroDevuelto.idUser = "0";
                libroDevuelto.fechaDevolucion = undefined;
                await this.librosRepository.updateLibro(libroDevuelto);  
            }
        } catch (error) {
            console.error("Error al devolver el libro ", error);
            throw error;
        }
    }

    async prestarLibro(id: string, idUser: string){
        try {            
            const libroAPrestar = await this.librosRepository.getLibro(id);
            let fechaActual = new Date();
            console.log(fechaActual);
            fechaActual.setDate(fechaActual.getDate()+21);
            if(libroAPrestar){
                libroAPrestar.idUser = idUser;
                console.log(fechaActual);                   
                libroAPrestar.fechaDevolucion = fechaActual;
                await this.librosRepository.updateLibro(libroAPrestar);
            }           
        } catch (error) {
            console.error("Error al prestar el libro ", error);
            throw error;
        }    
    }

    async guardarLibro(libro: Libro){
        return await this.librosRepository.guardarLibro(libro);
    }

    async deleteLibro(id: string){
        return await this.librosRepository.deleteLibro(id);
    }

    async getLibrosDisponibles(){
       return await this.librosRepository.getLibrosDisponibles();
    }

    async getLibrosPrestados(){
       return await this.librosRepository.getLibrosPrestados();      
    }
}