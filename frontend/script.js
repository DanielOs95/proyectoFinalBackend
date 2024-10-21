const input = document.querySelector('input');
const addBtn = document.querySelector('.btn-add');
const ul = document.querySelector('ul');
const empty = document.querySelector('.empty');


addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const text =input.value.trim();

    if (text !== "") {
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.textContent = text;

        li.appendChild(p);
        li.appendChild(addDeleteBtn());
        ul.appendChild(li)

        input.value = "";
        empty.style.display = "none";
    }
});

const addDeleteBtn = () => {
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = "X";
    deleteBtn.className = 'btn-delete';

    deleteBtn.addEventListener('click', (e) => {
        const item = e.target.parentElement;

        ul.removeChild(item);

        const items = document.querySelectorAll('li');

        if (items.length === 0) {
            empty.style.display = "block";
        }
    });

    return deleteBtn;
};

let btnShow = document.getElementById('lista')

btnShow.addEventListener('click', () => {
    fetch('http://localhost:3001/backend_final')
    .then(response => response.json())
    .then(data => {
        const showList = document.getElementById('mostrar');
        data.forEach(productos => {
            const showDatos = document.createElement('li');
            showDatos.textContent = productos.nombre;
            showList.appendChild(showDatos);

          showList.appendChild(showDatos);
        });
       
    })
    .catch(error => {
        console.error('Error:', error);
    });
})




/*let btnShow = document.getElementById('btnLibros')

btnShow.addEventListener('click', () => {
    fetch('http://localhost:3001/libros_project')
    .then(response => response.json())
    .then(data => {
        const showList = document.getElementById('mostrar');
        data.forEach(libros => {
            const showDatos = document.createElement('tr');



            const showTitulo = document.createElement('th')
            showDatos.textContent = libros.titulo;
            showList.appendChild(showTitulo);*/

            /*const showPaginas = document.createElement('th')
            showDatos.textContent = libros.paginas;
            showList.appendChild(showPaginas);

            const showPublicacion = document.createElement('th')
            showDatos.textContent = libros.publicacion_fecha;
            showList.appendChild(showPublicacion);

            const showEditorial = document.createElement('th')
            showDatos.textContent = libros.editorial;
            showList.appendChild(showEditorial);*/


            /*showList.appendChild(showDatos);
        });
       
    })
    .catch(error => {
        console.error('Error:', error);
    });
})*/

