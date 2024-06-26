require('dotenv').config()
require('express-async-errors') // O import da Async Errors tem que ficar antes das rotas
const express = require('express')
const { connectToDatabase } = require('./db/conexao')
const personagemRouter = require('./personagem/rotas')
const cors = require('cors')

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

    // catch-all: Tratamento de rotas não encontradas
    // Tem que ficar no final do código, depois de todos os endpoints e antes do listen
    app.use('*', (req, res) => {
        res.status(404).send({ error: 'Endpoint não encontrado'})
    })

    app.listen(3000, function() {
        console.log("Servidor rodando em http://localhost:3000")
    })

}

// Executa a função main() para conectar o Banco de Dados.
main()