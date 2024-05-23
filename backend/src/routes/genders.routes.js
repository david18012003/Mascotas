import { Router } from "express";
import { actualizarGender, crearGenders, listarGender } from "../controllers/genders.controller.js";

const routerGender = Router()

routerGender.post('/crear',crearGenders)
routerGender.get('/listar',listarGender)
routerGender.put('/actualizar/:id',actualizarGender)

export default routerGender