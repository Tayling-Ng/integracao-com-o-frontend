const express = require('express')

// const { readAll, readById, create, updateById, deleteById } = require('./controladores')
// Ao invés de importar todos os controladores, importa o arquivo todo assim:
const controladores = require('./controladores')
const { validarId } = require('../db/middleware')

const router = express.Router()

router.get('/', controladores.readAll)
router.get('/:id', validarId, controladores.readById)
router.post('/', controladores.create)
router.put('/:id', validarId,controladores.updateById)
router.delete('/:id', validarId, controladores.deleteById)


module.exports = router