import express, { Router } from "express";
import { UsersUseCases } from "../../application/user.usecases";
import UserRepositoryMongoDB from "../db/users.mongo";

const router = express.Router();
const usersUseCases: UsersUseCases = new UsersUseCases(new UserRepositoryMongoDB());

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const logUser = req.body;
        const user = await usersUseCases.logIn(logUser);
        if(user){
            res.json(user);
        }else{
            res.status(404).json({error: "EL usuario no esta registrado"});
        }

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error"});  
    }
    
});

router.post("/", async(req, res)=>{
    try {
        const newUser = req.body;
        const createdUser = await usersUseCases.registrar(newUser);
        res.status(201).json(createdUser);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;