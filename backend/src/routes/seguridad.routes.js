import { Router } from "express";
import { validar } from "../controllers/seguridad.controller.js";

const routerValidar =Router()

routerValidar.post('/validar',validar)

export default routerValidar