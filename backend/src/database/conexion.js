import{createPool}from 'mysql2'
import dotenv from 'dotenv'

dotenv.config({path:'./src/env/.env'})

export const pool = createPool({
    host:process.env.DB_HOST, 
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
    database:process.env.DB_DATABASE
})

export async function connectToDatabase() {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión exitosa a la base de datos.');
        return connection;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
        throw error; // Relanzar el error para que sea manejado por el código que llama a esta función
    }
}
