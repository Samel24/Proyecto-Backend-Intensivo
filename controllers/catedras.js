const query = require('../config/query'); // Importamos la función para realizar consultas a la BD

class Catedra {

    listar(){
        return new Promise( async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM catedras';
                const response = await query(sql);

                return resolve({
                    ok: true,
                    Catedras: response
                })
            } catch (error) {
                console.error('Error al mostrar las Catedras de la Universidad:', error)
                return reject({
                    ok: false,
                    mensaje: 'Tenemos un error al mostrar las Catedras de la Universidad',
                })
            }
        })
    }

    agregar(catedra) {
        return new Promise( async (resolve, reject) => {
            try {
                if (!catedra.nombre) {
                    return reject('Debes ingresar propiedades como: nombre')
                }

                const sql = 'SELECT * FROM catedras';
                const catedras = await query(sql);

                for (let i = 0; i < catedras.length; i++) {
                    if (catedras[i].nombre === catedra.nombre) {
                        return reject({
                            ok: false,
                            mensaje: 'Esta Catedra ya esta registrada'
                        })
                    }
                }

                const sql2 = 'INSERT INTO catedras (nombre, estudiantes) VALUES (?, ?)';
                const values = [catedra.nombre, 0]
                await query(sql2, values);

                return resolve({
                    ok: true,
                    catedra_agregada: catedra
                })
            } catch (error) {
                console.error('Error al agregar la Catedra:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al agregar la Catedra',
                })
            }
        })
    }

    eliminar(id){
        return new Promise( async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM catedras WHERE id=?';
                const catedra = await query(sql, Number(id));

                if (catedra.length === 0) {
                    return reject({
                        ok:false,
                        mensaje: "No se encontro la Catedra que estas buscando eliminar"
                    })
                }

                const sql2 = 'DELETE FROM catedras WHERE id=?';
                await query(sql2, Number(id));

                return resolve({
                    ok: true,
                    catedra_eliminada: catedra
                })
            } catch (error) {
                console.error('Error al eliminar la Catedra:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al eliminar la Catedra',
                })
            }
        })
    }
   
}

const catedrasC = new Catedra();
module.exports = catedrasC;