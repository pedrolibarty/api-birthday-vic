import bs from './data-source.js';

async function testConnection() {
    let {data, error} = await bs.from('guests').select('*');

    if (error) console.error('Erro', error);
    else console.log('Convidados', data)
}

testConnection();