const express = require('express')

// const { readAll, readById, create, updateById, deleteById } = require('./controladores')
// Ao invés de importar todos os controladores, importa o arquivo todo assim:
const controladores = require('./controladores')

const router = express.Router()

router.get('/', controladores.readAll)
router.get('/:id', controladores.readById)
router.post('/', controladores.create)
router.put('/:id', controladores.updateById)
router.delete('/:id', controladores.deleteById)


module.exports = router