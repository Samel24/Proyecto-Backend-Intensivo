const query = require('../config/query'); // Importamos la función para realizar consultas a la BD

class Carrera {

    listar(){
        return new Promise( async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM carreras';
                const response = await query(sql);

                return resolve({
                    ok: true,
                    Carreras: response
                })
            } catch (error) {
                console.error('Error al mostrar las Carreras de la Universidad:', error)
                return reject({
                    ok: false,
                    mensaje: 'Tenemos un error al mostrar las Carreras de la Universidad',
                })
            }
        })
    }
    
    agregar(carrera) {
        return new Promise( async (resolve, reject) => {
            try {
                if (!carrera.nombre) {
                    return reject('Debes ingresar propiedades como: nombre')
                }

                const sql = 'SELECT * FROM carreras';
                const carreras = await query(sql);

                for (let i = 0; i < carreras.length; i++) {
                    if (carreras[i].nombre === carrera.nombre) {
                        return reject({
                            ok: false,
                            mensaje: 'Esta Carrera ya esta registrada'
                        })
                    }
                }

                const sql2 = 'INSERT INTO carreras (nombre) VALUES (?)';
                await query(sql2, carrera.nombre);

                return resolve({
                    ok: true,
                    carrera_agregada: carrera.nombre
                })
            } catch (error) {
                console.error('Error al agregar la Carrera:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al agregar la Carrera',
                })
            }
        })
    }

    eliminar(id){
        return new Promise( async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM carreras WHERE id=?';
                const carrera = await query(sql, Number(id));

                if (carrera.length === 0) {
                    return reject({
                        ok:false,
                        mensaje: "no se encontro la Carrera que estas buscando eliminar"
                    })
                }

                const sql2 = 'DELETE FROM carreras WHERE id=?';
                await query(sql2, Number(id));

                return resolve({
                    ok: true,
                    carrera_eliminada: carrera
                })
            } catch (error) {
                console.error('Error al eliminar la Carrera:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al eliminar la Carrera',
                })
            }
        })
    }
}

const carrerasC = new Carrera();
module.exports = carrerasC;