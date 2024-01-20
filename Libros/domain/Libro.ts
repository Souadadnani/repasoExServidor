export default interface Libro {
    id?: string,
    titulo: string,
    autor: string,
    fechaDevolucion: Date | undefined,
    idUser: string
}