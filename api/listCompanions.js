import db from "../data-source";

export default async function handler(req, res){
    if (req.method === "GET") {
      const { id_guest } = req.params;
  
      let { data, error } = await db.from("companion").select("*").eq('cod_guest', id_guest);
  
      if (error) return res.status(500).json({ error: error.message });
  
      return res.status(200).json(data)
    }
  
    return res.status(405).json({ message: "Método não permitido" });
  };