const express = require('express');
const router = express.Router();
const Catedras = require('../controllers/catedras')
const checkAutenticacion = require('../controllers/service/jwtAuth');

/* GET Catedras (Proyecto) */
router.get('/',

    function (req, res, next) {
        roles = ["admin", "editor"];
        checkAutenticacion(req, res, next, roles);
    },

    function (req, res, next) {
        Catedras.listar()
            .then((resultado) => {
                res.status(200).json({ "status": 200, "data": resultado })
            })
            .catch((error) => {
                res.status(400).json({ status: 400, mensaje: "no se ha podido mostrar las Catedras", error: error })
            })
    }
);

/* POST Catedras (Proyecto) */
router.post('/',

    function (req, res, next) {
        roles = ["admin", "editor"];
        checkAutenticacion(req, res, next, roles);
    },

    function (req, res, next) {
        Catedras.agregar(req.body)
            .then((resultado) => {
                res.status(200).json({ status: 200, mensaje: resultado })
            })
            .catch((error) => {
                res.status(400).json({ status: 400, mensaje: "no se ha podido agregar la Catedra", error: error })
            })
    }
)

/* DELETE Catedras (Proyecto) */
router.delete('/:id',

    function (req, res, next) {
        roles = ["editor"];
        checkAutenticacion(req, res, next, roles);
    },

    function (req, res, next) {

        const { id } = req.params

        Catedras.eliminar(id)
            .then((resultado) => {
                res.status(200).json({ status: 200, mensaje: resultado })
            })
            .catch((error) => {
                res.status(400).json({ status: 400, mensaje: 'No se pudo eliminar la Catedra', error: error })
            })
    }
)

module.exports = router;
