import { db } from '@vercel/postgres';

export default async function handler(request, response) {
  try {
    const client = await db.connect();
    // Esto intentará crear una tabla de prueba si no existe
    await client.sql`CREATE TABLE IF NOT EXISTS Usuarios ( nombre varchar(255), email varchar(255) );`;
    
    // Insertamos un dato de ejemplo
    await client.sql`INSERT INTO Usuarios (nombre, email) VALUES ('Esteban', 'test@example.com');`;
    
    const users = await client.sql`SELECT * FROM Usuarios;`;
    
    return response.status(200).json({ users: users.rows });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}