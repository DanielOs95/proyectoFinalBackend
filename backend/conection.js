const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())


const conexion = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Marisol/MaMa-1995',
    database:'backend_final',
    waitForConnections: true,
});


const conection = (callback) => {
    createPool.conection((err, connection) => {
        if (err) {
            console.error('error al obtener conexion', err.message)
            return callback(err);
        }
        callback(null, connection)
    })
}


app.get('/backend_final', (req, res) => {
    conection((err, connection) => {
        if (err) return res.console.log('error al conectar')
        
            let datoSql = 'SELECT * FROM productos';
            connection.query(datoSql, (err, results) => {
                connection.release();

                if (err) {
                   console.error('error al consultar', err.message); 
                }
                res.json(results)
       })
    });
});


app.post('/backend_final', (req, res) => {
    const nombre = req.body.nombre;
    conection((err, connection) => {
        if (err) return res.console.log('error al conectar')

            const sql = 'insert into productos (nombre) values (?)';
    connection.query(sql, [nombre], (err, results) => {
        connection.release();
        
        if (err) {
            console.error('Error al insertar elemento:', err.message)
        }
        res.json(results)
       })
    })
})


app.delete('/backend_final/:id', (req, res) => {
    const {id} = req.params;
    conection((err, connection) => {
        if (err) return res.console.log('error al conectar')

            const sql = 'delete from productos where id = ?';
    conexion.query(sql, [id], (err, results) => {
        connection.release()
        
        if (err) {
            console.error('Error al eliminar elemento')
        }
        res.json(results)
       })
    })
})





app.listen('3001', () => {
    console.log('api corriendo en http://localhost:3001/backend_final')
});


