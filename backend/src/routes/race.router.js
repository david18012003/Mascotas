import { Router } from "express";
import { actualizarRace, crearRace, listarRace } from "../controllers/race.controller.js";

const routerRaces = Router()

routerRaces.post('/crear',crearRace)
routerRaces.get('/listar',listarRace)
routerRaces.put('/actualizar/:id',actualizarRace)

export default routerRaces