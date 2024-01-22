import express from "express";
import { UsersUseCases } from "../../application/user.usecases";
import UserRepositoryMongoDB from "../db/users.mongo";
import User from "../../domain/User";

const router = express.Router();
const usersUseCases: UsersUseCases = new UsersUseCases(new UserRepositoryMongoDB());

router.use(express.urlencoded({ extended: false }));
/* permite analizar datos de formularios HTML que se envían a través de solicitudes POST 
     { extended: true } permite el análisis de datos más complejos
*/
router.get("/login",async (req, res) => {
    //const content: object = {title: 'Iniciar Sesion'};
    res.render('login');
});

router.post("/", async (req, res) => {
    try {
        const { usuario, password } = req.body;
        const user: User = {
            usuario,
            password
        };
        const response = await usersUseCases.logIn(user);
        const mensaje = 'Sesión iniciada con exito!';
        if(response){
            res.render('mensaje', {response, mensaje});
            console.log("Sesion iniciada");           
           /*  res.json({
                user: {
                    id: response.id,
                    nombre: response.nombre,
                    apellidos: response.apellidos,
                    email: response.email,
                    libros: response.libros,                   
                }
            }); */
        }else{
            res.status(404).json({error: "EL usuario no esta registrado"});
        } 

    } catch (error) {
        console.log(error);     
        res.status(500).json({ error: "Internal Server Error"});  
    }   
});

export default router;