const input = document.querySelector('input');
const form = document.getElementById('form')
const addBtn = document.querySelector('.btn-add');
const ul = document.querySelector('ul');
const empty = document.querySelector('.empty');


addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    fetch('http://localhost:3001/backend_final', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre: nombre })
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error))

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

    deleteBtn.textContent = "✓";
    deleteBtn.className = 'btn-delete';

    return deleteBtn;
};

let btnShow = document.getElementById('lista')

btnShow.addEventListener('click', () => {
    fetch('http://localhost:3001/backend_final')
    .then(response => response.json())
    .then(data => {
        const showList = document.getElementById('mostrar');
        showList.innerHTML = "";
        data.forEach(productos => {
            const showDatos = document.createElement('li');
            showDatos.textContent = productos.nombre;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = "X";
            deleteBtn.className = 'btn-delete';
            showDatos.appendChild(deleteBtn);
            showList.appendChild(showDatos);

            deleteBtn.addEventListener('click', (e) => {
                const items = e.target.parentElement;
                const nombre = items.firstChild.textContent;//deleteBtn.getAttribute('btn-delete');
                console.log(nombre)
                fetch(`http://localhost:3001/backend_final/despensa/${nombre}`, {
                    method: 'DELETE',
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('error al eliminar')
                    }
                    return response.json()
                })
                .then((data) => {
                    console.log(data);
                    showList.removeChild(showDatos);
                })
                .catch((error) => console.error(error))
        });
       
        });
       
    })
    .catch(error => {
        console.error('Error:', error);
    });

    
})





