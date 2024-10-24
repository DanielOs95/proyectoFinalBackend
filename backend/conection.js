const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())


const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Marisol/MaMa-1995',
    database:'backend_final',
    waitForConnections: true,
});


const getConnection = (callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('error al obtener conexion', err.message)
            return callback(err);
        }
        callback(null, connection)
        
    })
}


app.get('/backend_final', (req, res) => {
    getConnection((err, connection) => {
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
    getConnection((err, connection) => {
        if (err) {
            console.log('error al conectar')
        }

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


app.delete('/backend_final/despensa/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    getConnection((err, connection) => {
        if (err) {
            console.log('error al conectar')
        }

            const sql = 'delete from productos where nombre = ?';
    connection.query(sql, [nombre], (err, results) => {
        connection.release()
        
        if (err) {
            console.error('Error al eliminar elemento', err.message)
        }
        res.json(results)
       })
    })
})





app.listen('3001', () => {
    console.log('api corriendo en http://localhost:3001/backend_final')
});


