const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/backend_final', (req, res) => {

    const conexion = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'Marisol/MaMa-1995',
        database:'backend_final'
    });
    
    conexion.connect((error) => {
        if (error) {
            console.error('Error al conectar a mysql:', error.message)
        }
        console.log('conexion exitosa')
    });
    
    let datoSql = 'SELECT * FROM productos';
    conexion.query(datoSql, (err, results) => {
        if (err) {
           console.error('error', err.message); 
        }
    
        res.json(results)
     conexion.end()
    });
    
});




app.listen('3001', () => {
    console.log('api corriendo en http://localhost:3001/backend_final')
});

