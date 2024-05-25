const personagem = require('./entidade')
const service = require('./service')

async function readAll(req, res) {
    // Acessar a lista de personagens na collection do MongoDB
    const itens = await service.readAll()
    // Enviar a lista de personagens como resultado
    res.send(itens)
}

async function readById(req, res) {
    // Acessar o parâmetro id
    const id = req.params.id
    // Acessar o item personagem no service
    const item = await service.readById(id)

    if (!item) {
        return res.status(404).send('Item não encontrado.')
    }

    res.send(item)
}

async function create(req, res) {
    // Acessar o corpo da requisição
    // const novoItem = req.body
    const {error, value: novoItem} = personagem.validate(req.body) 
    
    // Validação: Verificar se a palavra "nome" está no corpo da requisição
    // if (!novoItem || !novoItem.nome) {
    if (error) {
    return res.status(400).send({ error: error.details[0].message })
    }

    // TODO: Validação: Verificar se o novo item já está na coleção

    // Adicionar ua propriedade na coleção
    await service.create(novoItem)

    res.status(201).send(novoItem)
}

async function updateById(req, res) {
    // Acessar o parâmetro id
    const {error, value: novoItem} = personagem.validate(req.body) 
    
    // Validação: Verificar se a palavra "nome" está no corpo da requisição
    // if (!novoItem || !novoItem.nome) {
    if (error) {
    return res.status(400).send({ error: error.details[0].message })
    }

    // TODO: Validação: Verificar se o novo item já está na coleção

    // Atualizar o novo item usando o service
    await service.updateById(id, novoItem)

    res.status(201).send(novoItem)
}

async function deleteById(req, res) {
    // Acessar o parâmetro id
    const id = req.params.id

    // TODO: Validação: Checar se o item na requisição está na lista
    
    // Remover o item do DB usando id via service
    await service.deleteById(id)
    
    res.send('Item removido com sucesso: ' + id)
}

module.exports = {
    readAll,
    readById,
    create,
    updateById,
    deleteById
}