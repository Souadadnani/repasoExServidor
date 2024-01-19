import express from "express";
import LibrosUseCases from "../../application/libros.usecases";
import LibrosRepositoryMongoDB from "../db/libro.mongo";

const router = express.Router();
const librosUseCases: LibrosUseCases = new LibrosUseCases(new LibrosRepositoryMongoDB());

router.get("/", async(req, res)=>{
    try {
        const response = await librosUseCases.getAll();
        res.status(201).json(response);
    } catch (error) {
       res.status(500).json({error});       
    }

});

router.get("/:id",async (req, resp) => {
    try {
        const idLibro = req.params.id;
        const libro = await librosUseCases.getLibro(idLibro)
        resp.status(201).json(libro);
    } catch (error) {
        resp.status(500).json({error});
    }
});

router.post("/",async (req, resp) => {
    try {
        const newLibro = req.body;
        const libro = await librosUseCases.postLibro(newLibro);
        resp.status(201).json(libro);
    } catch (error) {
        resp.status(500).json(error);
    }
})











export default router;