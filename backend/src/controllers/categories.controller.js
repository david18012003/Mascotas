import { pool } from "../database/conexion.js";

export const crearCategoria =async(req,res)=>{
    try {
        const {id,name} =req.body
        const [resultado] = await pool.promise().query('INSERT INTO categories VALUES (?,?)',[id,name])

    if (resultado.affectedRows>0) {
        res.status(200).json({
            message:'La categoria fue registrada exitosamente '
        })
    } else {
        res.status(404).json({
            message:'La categoria no se pudo registrar '
        })
    }
    } catch (error) {
        res.status(500).json({
            message:'Error del servidor '+error
        })
    }
} 

export const listarCategoria = async(req,res)=>{
    try {
        const [categoria] = await pool.promise().query('SELECT * FROM categories')
        if (categoria.length>0) {
            res.status(200).json({
                categoria
            })
        } else {
            res.status(404).json({
                message:'No hay categirias regstradas '
            })
        }
    } catch (error) {
        res.status(500).json({
            message:'Error del servidor '+error
        })
    }
}

export const actualizarCategoria = async(req,res)=>{
    try {
        const {id} = req.params
        const {name} = req.body

        const [categoriaAnterior] = await pool.promise().query('select * from categories WHERE id = ?',[id])

        const [resultado] = await pool.promise().query(`UPDATE categories set name='${name ? name : categoriaAnterior[0].name}' WHERE id=?`,[id])

        if (resultado.affectedRows>0) {
            res.status(200).json({
                message:'Se actualizo la categoria correctamente'
            })
        } else {
            res.status(404).json({
                message:'No se pudo actualizar la categoria'
            })
        }
    } catch (error) {
        res.status(500).json({
            message:'Error del servidor '+error
        })
    }
}