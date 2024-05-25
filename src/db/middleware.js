const { ObjectId } = require("mongodb");

function validarId(req, res, next) {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'ID inválido' });
  }

  next();
}

module.exports = {
    validarId
}