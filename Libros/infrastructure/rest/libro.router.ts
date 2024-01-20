import express from "express";
import LibrosUsesCases from "../../application/libros.usecases";
import LibrosRepositoryMongoDB from "../db/libro.mongo";

const router = express.Router();
const librosUseCases: LibrosUsesCases = new LibrosUsesCases(new LibrosRepositoryMongoDB());

router.get("/",async (req, res) => {
    try {
        const libros = await librosUseCases.getAll();
        res.json(libros);
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
});

router.get("/disponibles",async (req, res) => {
    try {
        const librosDisponibles = await librosUseCases.getLibrosDisponibles();
        res.status(201).json(librosDisponibles);
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
});

router.get("/prestados",async (req, res) => {
    try {
        const librosPrestados = await librosUseCases.getLibrosPrestados();
        res.status(201).json(librosPrestados);
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
});

router.put("/prestar/:user/:id",async (req, res) => {
    try {
        const id = req.params.id;
        const idUser = req.params.user;
        const libroAPrestar = await librosUseCases.prestarLibro(id, idUser);
        res.status(201).json(libroAPrestar);
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
});

router.put("/devolver/:id",async (req, res) => {
    try {
        const id = req.params.id;
        const libroADevolver = await librosUseCases.devolverLibro(id);
        res.status(201).json(libroADevolver);
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
});

router.post("/",async (req, res) => {
    try {
        const newLibro = req.body;
        const createdLibro = await librosUseCases.guardarLibro(newLibro);
        res.status(201).json(createdLibro);
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const libro = await librosUseCases.deleteLibro(id);
        res.status(201).json(libro);
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
});

export default router;










