import supabase from './client.js';

async function testConnection() {
    let {data, error} = await supabase.from('guests').select('*');

    if (error) console.error('Erro', error);
    else console.log('Convidados', data)
}

testConnection();