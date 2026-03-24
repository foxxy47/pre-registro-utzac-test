import { db } from '@vercel/postgres';

export default async function handler(req, res) {
  // Intentamos conectar usando la variable por defecto de Neon o de Vercel
  const client = await db.connect();

  try {
    // Creamos la tabla (si ya existe no pasa nada)
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
      
      await client.sql`
        INSERT INTO aspirantes (nombre, movil, email, escuela, carrera)
        VALUES (${nombre}, ${movil}, ${email}, ${escuela}, ${carrera});
      `;
      
      return res.status(200).json({ mensaje: 'Guardado con éxito' });
    }

    return res.status(405).json({ error: 'Método no permitido' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}