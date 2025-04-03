import supabase from "./client.js";
import express from 'express';

const app = express();

app.use(express.json())

app.get('/api/guests', async (req, res) => {
    if(req.method === 'GET'){
        let {data, error} = await supabase.from('guests').select('*');

        if(error) return res.status(500).json({error: error.message});

        return res.status(200).json(data);
    }

    return res.status(405).json({message: 'Método não permitido'});
});

app.put('/api/guests/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const {data, error } = await supabase
    .from('guests')
    .update({status})
    .eq('id', id)
    .single();

    if(error) {
        return res.status(500).json({error: error.message});
    }

    res.status(200).json({message: 'Usuário atualizado', data});
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Servidor rodando!')
})