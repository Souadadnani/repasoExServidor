import Libro from "./Libro";

export default interface LibrosRepository{

   getAll(): Promise<Libro[] | undefined>;
   getLibro(id: string): Promise<Libro | undefined>;
   guardarLibro(libro: Libro): Promise<Libro | undefined>;
   updateLibro(libro: Libro): Promise<Libro | undefined>;
   deleteLibro(is: string): Promise<Libro [] | undefined>;
}