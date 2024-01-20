import Libro from "./Libro";

export default interface LibrosRepository{

   getAll(): Promise<Libro[] | undefined>;
   getLibrosDisponibles(): Promise<Libro[] | undefined>;
   getLibrosPrestados(): Promise<Libro[] | undefined>;
   getLibro(id: string): Promise<Libro | undefined>;
   guardarLibro(libro: Libro): Promise<Libro | undefined>;
   updateLibro(libro: Libro): Promise<Libro | undefined>;
   deleteLibro(id: string): Promise<Libro [] | undefined>;
}