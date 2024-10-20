const express = require('express')
const mysql = require('mysql2')
const app = express()


app.get('/libros_project/:libros', (req, res) => {
    //res.send({message: hola ${req.params.libros}})

    const conexion = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'Marisol/MaMa-1995',
        database:'libros_project'
    })
    
    conexion.connect((error) => {
        if (error) throw error;
        console.log('conexion exitosa')
    })
    
    let datoSql = 'select * from libros';
    conexion.query(datoSql, (err, results) => {
        if (err) {
           return console.err('error', err.message); 
        }
    
        res.json(results)
        //console.log('Datos', results);
    
    });
    conexion.end()
})



app.listen('3001', () => {
    console.log('api corriendo en http://localhost:3001/libros_project/:libros')
})

