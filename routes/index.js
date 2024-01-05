var express = require('express');
var router = express.Router();
const Estudiantes = require('../controllers/estudiantes')

/* Vista 1. */
router.get('/', function (req, res, next) {
  Estudiantes.listar()
    .then((resultado) => {
      console.log(resultado.estudiantes)
      const total = resultado.estudiantes
      res.render('index', { estudiantes: total });

    })
    .catch((error) => {
      res.status(400).json({ status: 400, mensaje: "no se ha podido mostrar los Estudiantes", error: error })
    })
});

/* Vista 2. */
router.get('/crear', function (req, res, next) {
  res.render('crear');
});

/* POST Estudiantes */
router.post('/estudiante', function (req, res, next) {
  const body = {
    nombre: req.body.nombre,
    edad: Number(req.body.edad),
    carrera: req.body.carrera
  }
  Estudiantes.agregar(body)
    .then((resultado) => {
      res.status(200).json({ status: 200, mensaje: resultado })
    })
    .catch((error) => {
      res.status(400).json({ status: 400, mensaje: "no se ha podido agregar el Estudiante", error: error })
    })
})

module.exports = router;
