import { Router } from "express";
import { actualizarPet, buscarPet2, buscarpet, cargarPhoto, crearPet, eliminarPet, listarPet } from "../controllers/pets.controller.js";
import { validar, validarToken } from "../controllers/seguridad.controller.js";


const routerPet = Router()

routerPet.post('/crear',validarToken,cargarPhoto,crearPet)
routerPet.get('/listar',validarToken,listarPet)
routerPet.get('/buscar2/:id',validarToken,buscarPet2)
routerPet.put('/actualizar/:id',validarToken,cargarPhoto,actualizarPet)
routerPet.delete('/eliminar/:id',validarToken,eliminarPet)
routerPet.get('/buscar/:id',validarToken,buscarpet)


export default routerPet