import Libro from "../../Libros/domain/Libro";

export default interface User{
    id?: string,
    nombre?: string,
    apellidos?: string,
    usuario: string,
    password: string,
    email?: string,
    news?: boolean,
    libros?: Array<Libro>
}