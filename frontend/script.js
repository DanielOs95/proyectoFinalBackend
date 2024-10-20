//const { response } = require("express")

//const { error } = require("console");

//const { response } = require("express")

let btnShow = document.getElementById('btnMostrar')

btnShow.addEventListener('click', () => {
    fetch('http://localhost:3001/libros_project/:libros')
    .then(response => response.json())
    .then(data => {
        const showList = document.getElementById('mostrar');
        data.results.forEach(libros => {
            const showDatos = document.createElement('tr');
            showDatos.textContent = libros.title;
            showList.appendChild(showDatos);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
})