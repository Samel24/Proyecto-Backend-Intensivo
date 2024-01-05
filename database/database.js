const { v4: uuidv4 } = require('uuid');

const estudiantes = [
    {
        id: uuidv4(),
        nombre: "Luis Torres",
        edad: 18,
        carrera: "Ingeniería de Computación"
    }
]

module.exports = estudiantes;