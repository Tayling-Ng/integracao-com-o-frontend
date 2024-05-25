const { MongoClient } = require('mongodb')

// Informações do Banco de Dados
const dbUrl = process.env.DATABASE_URL
// Quando muda o nome do banco automaticamente cria um banco novo no MongoDB
const dbName = 'integracao-com-frontend'

const client = new MongoClient(dbUrl)


// Declarar a função de conxeção com o Banco de dados
async function connectToDatabase() {
    // console.log('Conectando ao banco de dados...')
    await client.connect()
    // console.log('Banco de dados conectado com sucesso!')
}

// Estabelecer a conexão com o Banco de dados
// Criar uma função para quem precisar usar o Banco de Dados
function getDatabase() {
    return client.db(dbName)
}


module.exports = {
    connectToDatabase,
    getDatabase
}