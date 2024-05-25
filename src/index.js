require('dotenv').config()
const express = require('express')
const { connectToDatabase } = require('./db/conexao')
const personagemRouter = require('./personagem/rotas')
const cors = require('cors')
require('express-async-errors')

// Declarar a função de conxeção com o Banco de dados
async function main() {
    // Conectar ao BD
    await connectToDatabase()

    // Inicializar o express
    const app = express()

    // Receber o corpo da requisição em json
    app.use(express.json())

    // Endpoint de Teste
    app.get('/', function (req, res) {
        res.send('Hi Folks!')
    })

    // Rotas
    app.use('/personagem', personagemRouter)

    // Error Handling
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send({ error: 'Algo deu errado!' });
    });

    app.listen(3000, function() {
        console.log("Servidor rodando em http://localhost:3000")
    })

}

// Executa a função main() para conectar o Banco de Dados.
main()