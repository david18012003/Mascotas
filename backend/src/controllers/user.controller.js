import { pool } from "../database/conexion.js";
import bcrypt from 'bcrypt'

const saltRounds = 10

export const createUser = async (req, res) => {
    try {
        const { id, fullname, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password,saltRounds)

        const [resultado] = await pool.promise().query('INSERT INTO users (id, fullname, email, password) VALUES (?, ?, ?, ?)', [id, fullname, email, hashedPassword]);
        if (resultado.affectedRows > 0) {
            res.status(200).json({ message: 'Usuario registrado con éxito' });
        } else {
            res.status(404).json({ message: 'No se pudo registrar el usuario' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor: ' + error.message });
    }
};

export const listarUser = async (req, res) => {
    try {
        const [users] = await pool.promise().query('SELECT * FROM users');
        if (users.length > 0) {
            res.status(200).json({ users });
        } else {
            res.status(404).json({ message: 'No hay usuarios registrados' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor: ' + error.message });
    }
};

export const actualizarUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullname, email, password } = req.body;

        const [userAnterior] = await pool.promise().query("SELECT * FROM users WHERE id=?", [id]);

        const [resultado] = await pool.promise().query(`UPDATE users SET
            fullname='${fullname ? fullname : userAnterior[0].fullname}',
            email='${email ? email : userAnterior[0].email}', 
            password='${password ? password : userAnterior[0].password}'
            WHERE id=?`, [id]);

        if (resultado.affectedRows > 0) {
            res.status(201).json({ message: "Usuario actualizado con éxito" });
        } else {
            res.status(404).json({ message: "No se pudo actualizar el usuario" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error del servidor: " + error.message });
    }
};
