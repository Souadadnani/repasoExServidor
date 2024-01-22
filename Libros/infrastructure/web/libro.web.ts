import express from "express";
import LibrosUsesCases from "../../application/libros.usecases";
import LibrosRepositoryMongoDB from "../db/libro.mongo";


const router = express.Router();
const librosUseCases: LibrosUsesCases = new LibrosUsesCases(new LibrosRepositoryMongoDB());

router.get("/",async (req, res) => {  
    const librosDisponibles = await librosUseCases.getLibrosDisponibles();
    res.render('librosDisponibles', {librosDisponibles});
});

router.get("/prestados",async (req, res) => {
    const librosPrestados = await librosUseCases.getLibrosPrestados();
    res.render('librosPrestados', {librosPrestados});
});

export default router;