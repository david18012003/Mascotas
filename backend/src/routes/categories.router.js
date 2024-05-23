import { Router } from "express";
import { actualizarCategoria, crearCategoria, listarCategoria } from "../controllers/categories.controller.js";

const routerCategories = Router()

routerCategories.post('/crear',crearCategoria)
routerCategories.get('/listar',listarCategoria)
routerCategories.put('/actualizar/:id',actualizarCategoria)

export default routerCategories