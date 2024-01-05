const express = require('express');
const router = express.Router();
const Carreras = require('../controllers/carreras')
const checkAutenticacion = require('../controllers/service/jwtAuth');

/* GET Carreras (Proyecto) */
router.get('/',

    function (req, res, next) {
        roles = ["admin", "editor"];
        checkAutenticacion(req, res, next, roles);
    },

    function (req, res, next) {
        Carreras.listar()
            .then((resultado) => {
                res.status(200).json({ "status": 200, "data": resultado })
            })
            .catch((error) => {
                res.status(400).json({ status: 400, mensaje: "no se ha podido mostrar las Carreras", error: error })
            })
    }
);

/* POST Carreras (Proyecto) */
router.post('/',

    function (req, res, next) {
        roles = ["admin", "editor"];
        checkAutenticacion(req, res, next, roles);
    },

    function (req, res, next) {
        Carreras.agregar(req.body)
            .then((resultado) => {
                res.status(200).json({ status: 200, mensaje: resultado })
            })
            .catch((error) => {
                res.status(400).json({ status: 400, mensaje: "no se ha podido agregar la Carrera", error: error })
            })
    }
)

/* DELETE Carreras (Proyecto) */
router.delete('/:id',

    function (req, res, next) {
        roles = ["editor"];
        checkAutenticacion(req, res, next, roles);
    },

    function (req, res, next) {

        const { id } = req.params

        Carreras.eliminar(id)
            .then((resultado) => {
                res.status(200).json({ status: 200, mensaje: resultado })
            })
            .catch((error) => {
                res.status(400).json({ status: 400, mensaje: 'No se pudo eliminar la Carrera', error: error })
            })
    }
)

module.exports = router;
