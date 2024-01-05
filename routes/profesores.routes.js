const express = require('express');
const router = express.Router();
const Profesores = require('../controllers/profesores')
const checkAutenticacion = require('../controllers/service/jwtAuth');

/* GET Profesores (Proyecto) */
router.get('/',

    function (req, res, next) {
        roles = ["admin", "editor"];
        checkAutenticacion(req, res, next, roles);
    },

    function (req, res, next) {
        Profesores.listar()
            .then((resultado) => {
                res.status(200).json({ "status": 200, "data": resultado })
            })
            .catch((error) => {
                res.status(400).json({ status: 400, mensaje: "no se ha podido mostrar los Profesores", error: error })
            })
    }
);

/* POST Profesores (Proyecto) */
router.post('/',

    function (req, res, next) {
        roles = ["admin", "editor"];
        checkAutenticacion(req, res, next, roles);
    },

    function (req, res, next) {
        Profesores.agregar(req.body)
            .then((resultado) => {
                res.status(200).json({ status: 200, mensaje: resultado })
            })
            .catch((error) => {
                res.status(400).json({ status: 400, mensaje: "no se ha podido agregar el Profesor", error: error })
            })
    }
)

/* DELETE Profesores (Proyecto) */
router.delete('/:id',

    function (req, res, next) {
        roles = ["editor"];
        checkAutenticacion(req, res, next, roles);
    },

    function (req, res, next) {

        const { id } = req.params

        Profesores.eliminar(id)
            .then((resultado) => {
                res.status(200).json({ status: 200, mensaje: resultado })
            })
            .catch((error) => {
                res.status(400).json({ status: 400, mensaje: 'No se pudo eliminar el Profesor', error: error })
            })
    }
)

module.exports = router;
