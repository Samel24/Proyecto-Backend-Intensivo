const express = require('express');
const router = express.Router();
const Eventos = require('../controllers/eventos.js')
const checkAutenticacion = require('../controllers/service/jwtAuth');

/* GET Eventos (Proyecto) */
router.get('/',

    function (req, res, next) {
        roles = ["admin", "editor"];
        checkAutenticacion(req, res, next, roles);
    },

    function (req, res, next) {
        Eventos.listar()
            .then((resultado) => {
                res.status(200).json({ "status": 200, "data": resultado })
            })
            .catch((error) => {
                res.status(400).json({ status: 400, mensaje: "no se ha podido mostrar los Eventos", error: error })
            })
    }
);

/* POST Eventos (Proyecto) */
router.post('/',

    function (req, res, next) {
        roles = ["admin", "editor"];
        checkAutenticacion(req, res, next, roles);
    },

    function (req, res, next) {
        Eventos.agregar(req.body)
            .then((resultado) => {
                res.status(200).json({ status: 200, mensaje: resultado })
            })
            .catch((error) => {
                res.status(400).json({ status: 400, mensaje: "no se ha podido agregar el Evento", error: error })
            })
    }
)

/* DELETE Eventos (Proyecto) */
router.delete('/:id',

    function (req, res, next) {
        roles = ["editor"];
        checkAutenticacion(req, res, next, roles);
    },

    function (req, res, next) {

        const { id } = req.params

        Eventos.eliminar(id)
            .then((resultado) => {
                res.status(200).json({ status: 200, mensaje: resultado })
            })
            .catch((error) => {
                res.status(400).json({ status: 400, mensaje: 'No se pudo eliminar el Evento', error: error })
            })
    }
)

module.exports = router;
