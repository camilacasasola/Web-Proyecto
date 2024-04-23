//Esta parte se conecta a la direccion en la que ingresan los parametros en el html
//y con el get obterner la informacion de la tabla
fetch('/api/bebidacreate')
            .then(response => response.json())
            .then(bebidas => {
                const tableBody = document.getElementById('tablaBebidas').getElementsByTagName('tbody')[0];
                bebidas.forEach(bebida => {
                    const row = tableBody.insertRow();
                    row.insertCell(0).textContent = bebida.codigo;
                    row.insertCell(1).textContent = bebida.nombre;
                    row.insertCell(2).textContent = bebida.tipo;
                    row.insertCell(3).textContent = bebida.marca;
                    row.insertCell(4).textContent = bebida.precio;
                    row.insertCell(5).textContent = bebida.codigorestaurante;
                    row.insertCell(6).textContent = bebida.pais;
                    row.insertCell(7).textContent = bebida.codigomedida;
                    row.insertCell(8).textContent = bebida.ano;
                });
            })
            .catch(error => console.error('Error al cargar los colecciones:', error));

//aca va el codigo para editar y eliminar
//se crea unas constantes para obtener el form y table mediante el id
document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('tablaBebidas');
    const form = document.getElementById('bebidaForm');
    const messageContainer = form.querySelector('.message');

    //Evento de click para todas las filas de la tabla
    //esta seccion sirve para traer la informacion que form y mediante 
    //el click poder seleccionar la linea de la tabla y mandar la informacion de la tabla al form de vuelta
    table.addEventListener('click', function(event) {
        let target = event.target;
        while (target && target.nodeName !== "TR") {
            target = target.parentNode;
        }
        if (target && target.nodeName === "TR") { // Hemos encontrado la fila en la que se hizo clic
            const cells = target.getElementsByTagName('td');
            form.codigo.value = cells[0].textContent;
            form.nombre.value = cells[1].textContent;
            form.tipo.value = cells[2].textContent;
            form.marca.value = cells[3].textContent;
            form.precio.value = cells[4].textContent;
            form.codigorestaurante.value = cells[5].textContent;
            form.pais.value = cells[6].textContent;
            form.codigomedida.value = cells[7].textContent;
            form.ano.value = cells[8].textContent;
    
            //Limpia cualquier mensaje previo
            if (messageContainer) messageContainer.textContent = '';
        }
    });

    //Evento de clic para el botón de editar y poder actualizar y guardar cambios
    document.getElementById('btnEditar').addEventListener('click', function() {
        const bebidaData = {
            codigo: form.codigo.value,
            nombre: form.nombre.value,
            tipo: form.tipo.value,
            marca: form.marca.value,
            precio: form.precio.value,
            codigorestaurante: form.codigorestaurante.value,
            pais: form.pais.value,
            codigomedida: form.codigomedida.value,
            ano: form.ano.value
        };

        //llamada fetch para actualizar (PUT) la bebida
        //la ruta del html se hace el llamado para acceder a la informacion
        //mediante el uso del PUT se hace el update
        fetch(`/api/bebidacreate/${bebidaData.codigo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bebidaData)
        })
        .then(response => response.json())
        .then(data => {
            //se muestra mensaje de exito o manejar errores
            form.querySelector('.message').textContent = 'Bebida actualizada con éxito.';
            //Actualizar la pagina despues de un breve retraso para que el usuario pueda leer el mensaje de exito 
            setTimeout(() => {
                window.location.reload();
            }, 1000);
    })//manejo de errores
        .catch(error => {
            console.error('Error:', error);
            form.querySelector('.message').textContent = 'Error al actualizar la bebida.';
        });
    });

    //evento de clic para el boton de eliminar
    document.getElementById('btnEliminar').addEventListener('click', function() {
        const codigo = form.codigo.value;

        //se creo una confirmacion para mas seguridad y que no se elimine la informacion inmediatamente
        if (confirm('¿Estás seguro de que deseas eliminar esta bebida?')) {
            fetch(`/api/bebidacreate/${codigo}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                //Mostrar mensaje de exito o manejar errores
                form.querySelector('.message').textContent = 'Bebida eliminada con éxito.';
                //Actualizar la pagina después de un breve retraso para que el usuario pueda leer el mensaje
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            })//manejo de errores
            .catch(error => {
                console.error('Error:', error);
                form.querySelector('.message').textContent = 'Error al eliminar la bebida.';
            });
        }
    });
});
