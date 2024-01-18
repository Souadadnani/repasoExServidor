import express, { Router } from "express";
import { UsersUseCases } from "../../application/user.usecases";
import UserRepositoryMongoDB from "../db/users.mongo";
import User from "../../domain/User";

const router = express.Router();
const usersUseCases: UsersUseCases = new UsersUseCases(new UserRepositoryMongoDB());

router.post("/registrar", async(req, res)=>{
    try {
        const newUser = req.body;
        const createdUser = await usersUseCases.registrar(newUser);
        res.status(201).json(createdUser);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/iniciarsesion", async (req, res) => {
    try {
        const { usuario, password } = req.body;
        const user: User = {
            usuario,
            password,
            nombre: "",
            apellidos: "",
            news: false
        };

        const response = await usersUseCases.logIn(user);
        if(response){
            res.json(response);
        }else{
            res.status(404).json({error: "EL usuario no esta registrado"});
        }

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error"});  
    }
    
});

export default router;