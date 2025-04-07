import db from "./data-source.js";
import express from "express";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors())

app.get("/api/guests", async (req, res) => {
  if (req.method === "GET") {
    let { data, error } = await db.from("guests").select("*");

    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json(data);
  }

  return res.status(405).json({ message: "Método não permitido" });
});

app.get("/api/companions/:id_guest", async (req, res) => {
  if (req.method === "GET") {
    const { id_guest } = req.params;

    let { data, error } = await db.from("companion").select("*").eq('cod_guest', id_guest);

    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json(data)
  }

  return res.status(405).json({ message: "Método não permitido" });
});

app.put("/api/companions", async (req, res) => {
    const updates = req.body;
  
    if (!Array.isArray(updates)) {
      return res.status(400).json({ error: "Esperado um array com { id, status }." });
    }
  
    try {
      const results = await Promise.all(
        updates.map(({ id, status }) =>
          db.from("companion").update({ status }).eq("id", id)
        )
      );
  
      const errors = results.filter(r => r.error);
      if (errors.length > 0) {
        return res.status(500).json({
          message: "Algumas atualizações falharam.",
          details: errors.map(e => e.error.message),
        });
      }
  
      res.status(200).json({ message: "Todos os usuários foram atualizados com sucesso." });
    } catch (error) {
      res.status(500).json({ error: "Erro inesperado.", details: error.message });
    }
  });
  
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando!");
  
});
