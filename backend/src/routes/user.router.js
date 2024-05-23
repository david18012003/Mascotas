import { Router } from "express";
import { actualizarUser, createUser, listarUser } from "../controllers/user.controller.js";

const routeUser = Router();

// Definir rutas
routeUser.post('/crear', createUser);
routeUser.get('/listar', listarUser);
routeUser.put('/actualizar/:id',actualizarUser)

export default routeUser;
