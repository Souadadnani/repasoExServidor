import Libro from "../domain/Libro";
import LibrosRepository from "../domain/libro.repository";

export default class LibrosUseCases{

    private librosRepository: LibrosRepository;
    constructor(librosRepository: LibrosRepository){
        this.librosRepository = librosRepository;
    }

    getAll(){
        return this.librosRepository.getAll();
    } 

    getLibro(id: string){
        return this.librosRepository.getLibro(id);
    }

    deleteLibro(id: string){
        return this.librosRepository.deleteLibro(id);
    }

    postLibro(libro: Libro){
        return this.librosRepository.guardarLibro(libro);
    }

    updateLibro(libro: Libro){
        return this.librosRepository.updateLibro(libro);
    }
}