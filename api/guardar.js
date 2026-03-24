import { db } from '@vercel/postgres';

export default async function handler(req, res) {
  const client = await db.connect();

  try {
    // 1. Crear la tabla con tus campos específicos si no existe
    await client.sql`
      CREATE TABLE IF NOT EXISTS aspirantes (
        id SERIAL PRIMARY KEY,
        nombre TEXT,
        movil TEXT,
        email TEXT,
        escuela TEXT,
        carrera TEXT,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    if (req.method === 'POST') {
      const { nombre, movil, email, escuela, carrera } = req.body;
      
      // 2. Insertar los datos en la tabla
      await client.sql`
        INSERT INTO aspirantes (nombre, movil, email, escuela, carrera)
        VALUES (${nombre}, ${movil}, ${email}, ${escuela}, ${carrera});
      `;
      
      return res.status(200).json({ mensaje: 'Registro guardado con éxito' });
    }

    return res.status(405).json({ error: 'Método no permitido' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}