const query = require('../config/query'); // Importamos la función para realizar consultas a la BD

class Profesor {

    listar() {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM profesores';
                const response = await query(sql);

                return resolve({
                    ok: true,
                    Profesores: response
                })
            } catch (error) {
                console.error('Error al mostrar los Profesores de la Universidad:', error)
                return reject({
                    ok: false,
                    mensaje: 'Tenemos un error al mostrar los Profesores de la Universidad',
                })
            }
        })
    }

    agregar(profesor) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!profesor.nombre || !profesor.edad || !profesor.catedra) {
                    return reject('Debes ingresar propiedades como: nombre, edad y catedra')
                }

                if (Number.isInteger(profesor.edad) === false) {
                    return reject('Debes ingresar una edad escrita en numeros')
                }

                if (profesor.edad > 150 || profesor.edad < 0) {
                    return reject('Debes ingresar una valida entre 1 año y 150 años')
                }

                const sql = 'SELECT * FROM profesores';
                const profesores = await query(sql);

                for (let i = 0; i < profesores.length; i++) {
                    if (profesores[i].nombre === profesor.nombre && profesores[i].edad === profesor.edad) {
                        return reject({
                            ok: false,
                            mensaje: 'Este profesor ya esta registrado'
                        })
                    }
                }

                const sql1 = 'SELECT * FROM catedras WHERE nombre = ?';
                const verificacion_profesor = await query(sql1, profesor.catedra)

                if (verificacion_profesor.profesor != null) {
                    return reject({
                        ok: false,
                        mensaje: 'No se puede agregar el profesor porque ya esta un profesor asignado a la Cátedra'
                    })
                }

                const sql2 = 'SELECT nombre FROM catedras';
                const catedras = await query(sql2);

                for (let i = 0; i < catedras.length; i++) {
                    if (catedras[i].nombre === profesor.catedra) {
                        const sql3 = 'INSERT INTO profesores (nombre, edad, catedra) VALUES (?, ?, ?)';
                        const values = [profesor.nombre, profesor.edad, profesor.catedra];
                        await query(sql3, values);

                        const sql4 = 'UPDATE catedras SET profesor=? WHERE nombre=?';
                        const values2 = [profesor.nombre, profesor.catedra];
                        await query(sql4, values2);

                        return resolve({
                            ok: true,
                            profesor_agregado: profesor
                        })
                    }
                }

                return reject({
                    ok: false,
                    mensaje: 'Debes ingresar una cátedra válida en la cual el profesor pueda dar clases',
                    catedra_valida: catedras
                })


            } catch (error) {
                console.error('Error al agregar el Profesor:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al agregar el Profesor',
                })
            }
        })
    }

    eliminar(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM profesores WHERE id=?';
                const profesor = await query(sql, Number(id));

                if (profesor.length === 0) {
                    return reject({
                        ok: false,
                        mensaje: "No se encontro el Profesor que estas buscando eliminar"
                    })
                }

                const sql1 = 'UPDATE catedras SET profesor = NULL WHERE nombre=?';
                await query(sql1, profesor[0].catedra);

                const sql2 = 'DELETE FROM profesores WHERE id=?';
                await query(sql2, Number(id));

                return resolve({
                    ok: true,
                    profesor_eliminado: profesor
                })
            } catch (error) {
                console.error('Error al eliminar el Profesor:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al eliminar el Profesor',
                })
            }
        })
    }
}

const profesoresC = new Profesor();
module.exports = profesoresC;